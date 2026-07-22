"use client";

import React, { useState, useEffect } from 'react';
import { rtdb } from '@/lib/firebase';
import { ref, push, onValue, remove, update } from 'firebase/database';

export default function RecentProjects() {
  const [dbProjects, setDbProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    websiteUrl: '',
  });

  // 1. READ: Fetch Projects in Realtime
  useEffect(() => {
    const projectsRef = ref(rtdb, 'projects');
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).reverse();
        setDbProjects(list);
      } else {
        setDbProjects([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Cloudinary Upload Logic
  const uploadScreenshotToCloudinary = async (websiteUrl) => {
    try {
      const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(websiteUrl)}&screenshot=true&embed=screenshot.url`;
      
      const imageResponse = await fetch(screenshotUrl);
      if (!imageResponse.ok) throw new Error("Failed to fetch screenshot from Microlink");
      const imageBlob = await imageResponse.blob();
      
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", imageBlob);
      cloudinaryData.append("upload_preset", "webgrow_preset");

      const res = await fetch("https://api.cloudinary.com/v1_1/duyauncgi/image/upload", {
        method: "POST",
        body: cloudinaryData
      });
      
      const fileData = await res.json();
      if (fileData.secure_url) {
        return fileData.secure_url;
      } else {
        throw new Error(fileData.error?.message || "Cloudinary Upload Failed");
      }
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };

  // 2. CREATE & UPDATE Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.websiteUrl) return alert("Title and Website URL are required!");

    setIsUploading(true);

    try {
      let finalImageUrl = "";

      if (isEditing) {
        const currentProject = dbProjects.find(p => p.id === editId);
        
        if (currentProject && currentProject.websiteUrl !== formData.websiteUrl) {
          finalImageUrl = await uploadScreenshotToCloudinary(formData.websiteUrl);
        } else {
          finalImageUrl = currentProject?.imageUrl || "";
        }

        const projectRef = ref(rtdb, `projects/${editId}`);
        await update(projectRef, {
          title: formData.title,
          category: formData.category || "Web Project",
          description: formData.description || "No description provided.",
          websiteUrl: formData.websiteUrl,
          imageUrl: finalImageUrl,
        });
        alert("Project updated successfully!");
        setIsEditing(false);
        setEditId(null);
      } else {
        finalImageUrl = await uploadScreenshotToCloudinary(formData.websiteUrl);

        const projectsRef = ref(rtdb, 'projects');
        const newProject = {
          title: formData.title,
          category: formData.category || "Web Project",
          description: formData.description || "No description provided.",
          websiteUrl: formData.websiteUrl,
          imageUrl: finalImageUrl || `https://picsum.photos/seed/${encodeURIComponent(formData.title)}/600/400`,
          features: [
            { icon: "bi-laptop", text: "Responsive" },
            { icon: "bi-lightning-charge", text: "Fast Load" },
            { icon: "bi-search", text: "SEO Ready" }
          ]
        };
        await push(projectsRef, newProject);
        alert("Project deployed successfully!");
      }

      setFormData({ title: '', category: '', description: '', websiteUrl: '' });
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Action failed!");
    } finally {
      setIsUploading(false);
    }
  };

  // 3. EDIT TRIGGER
  const handleEditClick = (project) => {
    setIsEditing(true);
    setEditId(project.id);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      websiteUrl: project.websiteUrl,
    });
  };

  // 4. DELETE WORKFLOW
  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const projectRef = ref(rtdb, `projects/${id}`);
        await remove(projectRef);
        alert("Project deleted successfully!");
        if (isEditing && editId === id) {
          cancelEditing();
        }
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Delete failed!");
      }
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ title: '', category: '', description: '', websiteUrl: '' });
  };

  return (
    <div className="container-fluid px-2 px-md-3 position-relative" style={{ zIndex: 1 }}>
      <div className="row g-3 m-0">
        {/* Dynamic Form: Add / Edit Project */}
        <div className="col-12 col-xl-8 ps-0">
          <div 
            className="rounded-4 p-4 border" 
            style={{ 
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
              boxShadow: '0 10px 30px var(--shadow-color)'
            }}
          >
            <h5 className="fw-black text-theme-primary mb-4 d-flex align-items-center gap-2" style={{ fontWeight: 800 }}>
              <i className={`bi ${isEditing ? 'bi-pencil-square text-info' : 'bi-plus-circle-fill text-pink'}`}></i>
              {isEditing ? "Edit Project Details" : "Add New Project"}
            </h5>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-theme-secondary">Project Title</label>
                <input 
                  type="text" 
                  className="form-control form-control-sm rounded-3 text-theme-primary border" 
                  name="title"
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="e.g. Asad Hospital Alwar" 
                  required 
                  disabled={isUploading}
                  style={{ backgroundColor: 'var(--bg-pill)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-theme-secondary">Category</label>
                <input 
                  type="text" 
                  className="form-control form-control-sm rounded-3 text-theme-primary border" 
                  name="category"
                  value={formData.category} 
                  onChange={handleChange} 
                  placeholder="e.g. Healthcare Portal" 
                  disabled={isUploading}
                  style={{ backgroundColor: 'var(--bg-pill)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-theme-secondary">Website / Live URL</label>
                <input 
                  type="url" 
                  className="form-control form-control-sm rounded-3 text-theme-primary border" 
                  name="websiteUrl"
                  value={formData.websiteUrl} 
                  onChange={handleChange} 
                  placeholder="https://example.com" 
                  required 
                  disabled={isUploading}
                  style={{ backgroundColor: 'var(--bg-pill)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-theme-secondary">Description</label>
                <textarea 
                  className="form-control form-control-sm rounded-3 text-theme-primary border" 
                  rows="3" 
                  name="description"
                  value={formData.description} 
                  onChange={handleChange} 
                  placeholder="Write a brief description..."
                  disabled={isUploading}
                  style={{ backgroundColor: 'var(--bg-pill)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                ></textarea>
              </div>
              
              <div className="d-flex gap-2">
                <button 
                  type="submit" 
                  className="btn-neon-cta w-100 justify-content-center py-2"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Generating &amp; Uploading...
                    </>
                  ) : (
                    isEditing ? "Update Project" : "Deploy Project"
                  )}
                </button>

                {isEditing && !isUploading && (
                  <button 
                    type="button" 
                    className="btn btn-secondary-glow rounded-3 py-2"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Deployments List View */}
        <div className="col-12 col-xl-4 pe-0">
          <div 
            className="rounded-4 p-4 border" 
            style={{ 
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
              boxShadow: '0 10px 30px var(--shadow-color)'
            }}
          >
            <h5 className="fw-black text-theme-primary mb-3" style={{ fontWeight: 800 }}>Recent Deployments</h5>
            
            <div className="overflow-auto pe-1" style={{ maxHeight: '480px' }}>
              <div className="row row-cols-1 g-3 m-0">
                {dbProjects.map((project) => (
                  <div key={project.id} className="col px-0">
                    <div 
                      className="p-3 rounded-3 border h-100 d-flex flex-column justify-content-between"
                      style={{ backgroundColor: 'var(--bg-pill)', borderColor: 'var(--border-subtle)' }}
                    >
                      <div className="text-truncate mb-2">
                        <h6 className="fw-black text-theme-primary m-0 text-truncate" title={project.title} style={{ fontWeight: 800 }}>
                          {project.title}
                        </h6>
                        <span className="badge rounded-pill text-white my-2 small text-truncate" style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', fontSize: '0.65rem' }}>
                          {project.category}
                        </span>
                        <small className="text-theme-secondary d-block text-truncate" title={project.websiteUrl} style={{ fontSize: '0.78rem' }}>
                          <strong>Target:</strong> {project.websiteUrl}
                        </small>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top" style={{ borderColor: 'var(--border-subtle)' }}>
                        <span className="badge bg-success bg-opacity-20 text-white rounded-pill px-2.5 py-1 small">
                          Production
                        </span>
                        <div className="d-flex gap-1">
                          <button 
                            className="btn btn-sm btn-secondary-glow py-1 px-2 rounded-2"
                            onClick={() => handleEditClick(project)}
                            title="Edit Project"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger py-1 px-2 rounded-2"
                            onClick={() => handleDeleteClick(project.id)}
                            title="Delete Project"
                          >
                            <i className="bi bi-trash3-fill"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {dbProjects.length === 0 && (
                <div className="text-center text-theme-secondary py-5">No projects found in Firebase database.</div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}