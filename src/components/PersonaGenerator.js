import React, { useState } from 'react';

const PersonaGenerator = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    primaryColor: '#3b82f6', // Default blue
    focusType: 'Interaction-focused',
    sessionLength: 'Short sessions',
    platformPref: 'Mobile user',
    motives: ['', '', '']
  });
  
  const [generatedSVG, setGeneratedSVG] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleMotiveChange = (index, value) => {
    const newMotives = [...formData.motives];
    newMotives[index] = value;
    setFormData({
      ...formData,
      motives: newMotives
    });
  };
  
  const generatePersonaSVG = () => {
    // This is a simplified version - a real implementation would have more robust SVG generation
    const svg = `
      <svg width="300" height="500" xmlns="http://www.w3.org/2000/svg">
        <!-- Persona Avatar Circle -->
        <circle cx="150" cy="100" r="70" fill="#f3f4f6" stroke="#e5e7eb" stroke-width="2"/>
        
        <!-- Colored Body Shape -->
        <rect x="80" y="90" width="140" height="110" rx="70" fill="${formData.primaryColor}"/>
        
        <!-- Face -->
        <circle cx="150" cy="90" r="40" fill="#f8d5a8"/>
        <path d="M130,100 Q150,120 170,100" stroke="black" stroke-width="2" fill="none"/>
        
        <!-- Name and Title -->
        <text x="150" y="220" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">${formData.name}</text>
        <text x="150" y="250" font-family="Arial" font-size="16" text-anchor="middle">${formData.title}</text>
        
        <!-- Characteristics -->
        <rect x="60" y="270" width="${formData.focusType.length * 7 + 20}" height="30" rx="15" fill="#f3f4f6"/>
        <text x="75" y="290" font-family="Arial" font-size="14">${formData.focusType}</text>
        
        <rect x="60" y="310" width="${formData.sessionLength.length * 7 + 20}" height="30" rx="15" fill="#f3f4f6"/>
        <text x="75" y="330" font-family="Arial" font-size="14">${formData.sessionLength}</text>
        
        <rect x="60" y="350" width="${formData.platformPref.length * 7 + 20}" height="30" rx="15" fill="#f3f4f6"/>
        <text x="75" y="370" font-family="Arial" font-size="14">${formData.platformPref}</text>
        
        <!-- Interaction Motives -->
        <text x="60" y="410" font-family="Arial" font-size="16" font-weight="bold">Interaction Motives</text>
        <circle cx="70" cy="430" r="5" fill="${formData.primaryColor}"/>
        <text x="85" y="435" font-family="Arial" font-size="14">${formData.motives[0]}</text>
        
        <circle cx="70" cy="455" r="5" fill="${formData.primaryColor}"/>
        <text x="85" y="460" font-family="Arial" font-size="14">${formData.motives[1]}</text>
        
        <circle cx="70" cy="480" r="5" fill="${formData.primaryColor}"/>
        <text x="85" y="485" font-family="Arial" font-size="14">${formData.motives[2]}</text>
      </svg>
    `;
    
    setGeneratedSVG(svg);
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">XR Persona Generator</h1>
      
      <div className="flex flex-wrap gap-8">
        <div className="w-full lg:w-1/2">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Persona Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g. Themba"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Persona Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g. The heritage seeker"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
              <input
                type="color"
                name="primaryColor"
                value={formData.primaryColor}
                onChange={handleInputChange}
                className="w-full p-1 border border-gray-300 rounded-md h-10"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Focus Type</label>
              <select
                name="focusType"
                value={formData.focusType}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Interaction-focused">Interaction-focused</option>
                <option value="Story-focused">Story-focused</option>
                <option value="Content-focused">Content-focused</option>
                <option value="Detail-oriented">Detail-oriented</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Session Length</label>
              <select
                name="sessionLength"
                value={formData.sessionLength}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Short sessions">Short sessions</option>
                <option value="Medium sessions">Medium sessions</option>
                <option value="Long sessions">Long sessions</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Platform Preference</label>
              <select
                name="platformPref"
                value={formData.platformPref}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Mobile user">Mobile user</option>
                <option value="No platform preference">No platform preference</option>
                <option value="Prefers console">Prefers console</option>
                <option value="Prefers PC">Prefers PC</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interaction Motives</label>
              {formData.motives.map((motive, index) => (
                <input
                  key={index}
                  type="text"
                  value={motive}
                  onChange={(e) => handleMotiveChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  placeholder={`Motive ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={generatePersonaSVG}
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Generate Persona
            </button>
          </div>
        </div>
        
        <div className="w-full lg:w-5/12">
          <div className="border border-gray-300 rounded-md p-4 h-full flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-center">Preview</h2>
            {generatedSVG ? (
              <div className="flex-grow flex items-center justify-center">
                <div dangerouslySetInnerHTML={{ __html: generatedSVG }} />
              </div>
            ) : (
              <div className="flex-grow flex items-center justify-center text-gray-500">
                Fill out the form and click "Generate Persona" to see a preview
              </div>
            )}
            {generatedSVG && (
              <div className="mt-4 text-center">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  onClick={() => {
                    const blob = new Blob([generatedSVG], { type: 'image/svg+xml' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${formData.name.toLowerCase()}-persona.svg`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                >
                  Download SVG
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaGenerator;