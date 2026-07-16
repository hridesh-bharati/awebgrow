"use client";
// src\components\Dashboard\Admin\RecentProjects.jsx
import React, { useState, useEffect } from 'react';
import { rtdb } from '@/lib/firebase';
import { ref, push, onValue, remove, update } from 'firebase/database';

export default function RecentProjects() {
  const [dbProjects, setDbProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // स्क्रीनशॉट अपलोडिंग स्टेट के लिए
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    websiteUrl: '',
  });

  // 1. READ: Firebase से प्रोजेक्ट्स को रीयल-टाइम फ़ेच करना
  useEffect(() => {
    const projectsRef = ref(rtdb, 'projects');
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).reverse(); // नया प्रोजेक्ट सबसे ऊपर दिखेगा
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

  // Cloudinary Upload Logic (Using Your Env Credentials)
  const uploadScreenshotToCloudinary = async (websiteUrl) => {
    try {
      // 1. Microlink से लाइव वेबसाइट का स्क्रीनशॉट URL लेना
      const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(websiteUrl)}&screenshot=true&embed=screenshot.url`;
      
      // 2. Image URL को Blob ऑब्जेक्ट में कन्वर्ट करना
      const imageResponse = await fetch(screenshotUrl);
      if (!imageResponse.ok) throw new Error("Failed to fetch screenshot from Microlink");
      const imageBlob = await imageResponse.blob();
      
      // 3. Cloudinary Form Data तैयार करना
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", imageBlob);
      cloudinaryData.append("upload_preset", "webgrow_preset"); // Your Preset

      // 4. Cloudinary API पर इमेज पोस्ट करना
      const res = await fetch("https://api.cloudinary.com/v1_1/duyauncgi/image/upload", {
        method: "POST",
        body: cloudinaryData
      });
      
      const fileData = await res.json();
      if (fileData.secure_url) {
        return fileData.secure_url; // Cloudinary Hosted Image Link
      } else {
        throw new Error(fileData.error?.message || "Cloudinary Upload Failed");
      }
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };

  // 2. CREATE & UPDATE: सबमिट हैंडलर
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.websiteUrl) return alert("Title and Website URL are required!");

    setIsUploading(true);

    try {
      let finalImageUrl = "";

      if (isEditing) {
        // UPDATE WORKFLOW
        const currentProject = dbProjects.find(p => p.id === editId);
        
        // यदि यूआरएल बदला है, केवल तभी नया स्क्रीनशॉट जनरेट और अपलोड करें
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
          imageUrl: finalImageUrl, // Saved Cloudinary Link
        });
        alert("Project updated successfully!");
        setIsEditing(false);
        setEditId(null);
      } else {
        // CREATE WORKFLOW
        finalImageUrl = await uploadScreenshotToCloudinary(formData.websiteUrl);

        const projectsRef = ref(rtdb, 'projects');
        const newProject = {
          title: formData.title,
          category: formData.category || "Web Project",
          description: formData.description || "No description provided.",
          websiteUrl: formData.websiteUrl,
          imageUrl: finalImageUrl || `https://picsum.photos/seed/${encodeURIComponent(formData.title)}/600/400`, // Fail-safe fallback
          features: [
            { icon: "bi-laptop", text: "Responsive" },
            { icon: "bi-lightning-charge", text: "Fast Load" },
            { icon: "bi-search", text: "SEO Ready" }
          ]
        };
        await push(projectsRef, newProject);
        alert("Project deployed successfully!");
      }

      // फ़ॉर्म रिसेट करें
      setFormData({ title: '', category: '', description: '', websiteUrl: '' });
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Action failed!");
    } finally {
      setIsUploading(false);
    }
  };

  // 3. EDIT TRIGGER: फ़ॉर्म में पुराना डेटा लोड करने के लिए
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

  // 4. DELETE WORKFLOW: डेटाबेस से हटाने के लिए
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
    <div className="row g-4">
      {/* Dynamic Form: Add / Edit Project */}
      <div className="col-lg-7">
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-top" style={{ top: '20px', zIndex: '10' }}>
          <h5 className="fw-bold text-dark mb-4">
            <i className={`bi ${isEditing ? 'bi-pencil-square text-info' : 'bi-plus-circle-fill text-warning'} me-2`}></i>
            {isEditing ? "Edit Project Details" : "Add New Project"}
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-bold text-secondary">Project Title</label>
              <input 
                type="text" 
                className="form-control form-control-sm rounded-3" 
                name="title"
                value={formData.title} 
                onChange={handleChange} 
                placeholder="e.g. Asad Hospital Alwar" 
                required 
                disabled={isUploading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold text-secondary">Category</label>
              <input 
                type="text" 
                className="form-control form-control-sm rounded-3" 
                name="category"
                value={formData.category} 
                onChange={handleChange} 
                placeholder="e.g. Healthcare Portal" 
                disabled={isUploading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold text-secondary">Website / Live URL</label>
              <input 
                type="url" 
                className="form-control form-control-sm rounded-3" 
                name="websiteUrl"
                value={formData.websiteUrl} 
                onChange={handleChange} 
                placeholder="https://example.com" 
                required 
                disabled={isUploading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold text-secondary">Description</label>
              <textarea 
                className="form-control form-control-sm rounded-3" 
                rows="3" 
                name="description"
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Write a brief description..."
                disabled={isUploading}
              ></textarea>
            </div>
            
            <div className="d-flex gap-2">
              <button 
                type="submit" 
                className={`btn w-100 text-white fw-bold py-2 text-uppercase rounded-3 small`}
                style={{ backgroundColor: isEditing ? '#0DCAF0' : '#FEA116', letterSpacing: '0.5px' }}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Generating & Uploading Screen...
                  </>
                ) : (
                  isEditing ? "Update Project" : "Deploy Project"
                )}
              </button>
              {isEditing && !isUploading && (
                <button 
                  type="button" 
                  className="btn btn-secondary fw-bold py-2 text-uppercase rounded-3 small"
                  onClick={cancelEditing}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* MODIFIED: Deployments List View */}
      <div className="col-lg-4">
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white" style={{ minHeight: '520px' }}>
          <h5 className="fw-bold text-dark mb-3">Recent Client Deployments</h5>
          
          {/* Scrollable Container with Fixed Height */}
          <div className="overflow-auto pe-1" style={{ maxHeight: '460px' }}>
            <div className="row row-cols-1 row-cols-md-2 g-3">
              {dbProjects.map((project) => (
                <div key={project.id} className="col">
                  <div className="p-3 rounded-3 border bg-light h-100 d-flex flex-column justify-content-between shadow-sm">
                    <div className="text-truncate mb-2">
                      <h6 className="fw-bold text-dark m-0 text-truncate" title={project.title}>
                        {project.title}
                      </h6>
                      <span className="badge bg-white text-secondary border my-2 small text-truncate max-w-100">
                        {project.category}
                      </span>
                      <small className="text-muted d-block text-truncate" title={project.websiteUrl}>
                        <strong>Target:</strong> {project.websiteUrl}
                      </small>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top">
                      <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2.5 py-1.5 small">
                        Production
                      </span>
                      <div className="d-flex gap-1">
                        <button 
                          className="btn btn-sm btn-outline-primary py-1 px-2 rounded-2"
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
              <div className="text-center text-muted py-5">No projects found in Firebase.</div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}