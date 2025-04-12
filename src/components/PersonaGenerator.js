import React, { useState, useRef } from 'react';

const XRPersonaGenerator = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    primaryColor: '#3b82f6', // Default blue
    // XR-specific categories
    focusType: 'Interaction-focused',
    sessionLength: 'Short sessions (5-15 min)',
    platformPref: 'Mobile-first user',
    xrExperienceLevel: 'XR novice',
    accessibilityNeeds: [],
    interactionPreferences: [],
    // Heritage-specific for museum/education contexts
    culturalContext: '',
    // Interaction motives with color coding
    motives: ['', '', '']
  });
  
  const [generatedSVG, setGeneratedSVG] = useState('');
  const svgContainerRef = useRef(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (category, value) => {
    const currentValues = formData[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    setFormData({
      ...formData,
      [category]: newValues
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
    // More sophisticated SVG that matches the examples better
    const svg = `
      <svg width="300" height="580" xmlns="http://www.w3.org/2000/svg">
        <!-- Outer Circle -->
        <circle cx="150" cy="100" r="80" fill="white" stroke="${formData.primaryColor}" stroke-width="6"/>
        
        <!-- Avatar Body Shape -->
        <circle cx="150" cy="120" r="50" fill="${formData.primaryColor}"/>
        
        <!-- Face -->
        <circle cx="150" cy="80" r="40" fill="#f8d5a8"/>
        <path d="M130,90 Q150,110 170,90" stroke="black" stroke-width="2" fill="none"/>
        
        <!-- Name and Title -->
        <text x="150" y="220" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">${formData.name || "User Persona"}</text>
        <text x="150" y="250" font-family="Arial" font-size="16" text-anchor="middle">${formData.title || "XR User"}</text>
        
        <!-- Characteristics - Better styled to match examples -->
        <rect x="60" y="280" width="180" height="30" rx="15" fill="#f3f4f6"/>
        <text x="150" y="300" font-family="Arial" font-size="14" text-anchor="middle">${formData.focusType}</text>
        
        <rect x="60" y="320" width="180" height="30" rx="15" fill="#f3f4f6"/>
        <text x="150" y="340" font-family="Arial" font-size="14" text-anchor="middle">${formData.sessionLength}</text>
        
        <rect x="60" y="360" width="180" height="30" rx="15" fill="#f3f4f6"/>
        <text x="150" y="380" font-family="Arial" font-size="14" text-anchor="middle">${formData.platformPref}</text>
        
        <!-- XR Experience Level -->
        <rect x="60" y="400" width="180" height="30" rx="15" fill="#e5e7eb"/>
        <text x="150" y="420" font-family="Arial" font-size="14" text-anchor="middle">${formData.xrExperienceLevel}</text>
        
        <!-- Interaction Motives - Now with color-coded bullets -->
        <text x="60" y="450" font-family="Arial" font-size="16" font-weight="bold">Interaction Motives</text>
        <circle cx="70" cy="470" r="5" fill="${formData.primaryColor}"/>
        <text x="85" y="475" font-family="Arial" font-size="14">${formData.motives[0] || "Not specified"}</text>
        
        <circle cx="70" cy="495" r="5" fill="${formData.primaryColor}"/>
        <text x="85" y="500" font-family="Arial" font-size="14">${formData.motives[1] || "Not specified"}</text>
        
        <circle cx="70" cy="520" r="5" fill="${formData.primaryColor}"/>
        <text x="85" y="525" font-family="Arial" font-size="14">${formData.motives[2] || "Not specified"}</text>
        
        <!-- If accessibility needs are specified -->
        ${formData.accessibilityNeeds?.length > 0 ? `
          <text x="60" y="550" font-family="Arial" font-size="14" font-weight="bold">Accessibility: ${formData.accessibilityNeeds.join(', ')}</text>
        ` : ''}
      </svg>
    `;
    
    setGeneratedSVG(svg);
  };
  
  const downloadSVG = () => {
    if (!generatedSVG) return;
    
    const blob = new Blob([generatedSVG], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.name.toLowerCase() || 'xr-persona'}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const generateRandomPersona = () => {
    // Examples inspired by the provided persona images
    const personas = [
      {
        name: 'Sipho',
        title: 'The Digital Heritage Explorer',
        primaryColor: '#3b82f6', // blue
        focusType: 'Interaction-focused',
        sessionLength: 'Short sessions (5-15 min)',
        platformPref: 'Mobile-first user',
        xrExperienceLevel: 'XR enthusiast',
        accessibilityNeeds: ['Low-bandwidth alternatives'],
        interactionPreferences: ['3D Exploration', 'Interactive Navigation'],
        culturalContext: 'Local heritage connection',
        motives: ['Digital innovation focus', 'Social media sharing', 'Quick, impactful experiences']
      },
      {
        name: 'Themba',
        title: 'The Heritage Seeker',
        primaryColor: '#22c55e', // green
        focusType: 'Interaction-focused',
        sessionLength: 'Short sessions',
        platformPref: 'Mobile user',
        xrExperienceLevel: 'XR novice',
        accessibilityNeeds: [],
        interactionPreferences: ['Audio Integration', 'Visual Effects'],
        culturalContext: 'Personal heritage connection',
        motives: ['Connect with heritage', 'Share on social media', 'Brief, impactful experiences']
      },
      {
        name: 'Nomvula',
        title: 'The Cultural Connection Seeker',
        primaryColor: '#a855f7', // purple
        focusType: 'Emotionally-driven',
        sessionLength: 'Medium-long sessions',
        platformPref: 'Values personal stories',
        xrExperienceLevel: 'XR comfortable',
        accessibilityNeeds: ['Multiple language options'],
        interactionPreferences: ['Audio Integration'],
        culturalContext: 'Intergenerational sharing',
        motives: ['Heritage connection', 'Emotional resonance', 'Intergenerational sharing']
      }
    ];
    
    const randomPersona = personas[Math.floor(Math.random() * personas.length)];
    setFormData(randomPersona);
    
    // Need to delay the SVG generation to ensure state is updated
    setTimeout(() => {
      generatePersonaSVG();
    }, 100);
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">XR Persona Generator</h1>
      <p className="text-center text-gray-600 mb-4">Create personas for digital heritage, museum XR experiences, and more</p>
      
      <div className="mb-4 text-center">
        <button
          onClick={generateRandomPersona}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 mb-4"
        >
          Generate Sample XR Persona
        </button>
      </div>
      
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
              <div className="flex space-x-2">
                <input
                  type="color"
                  name="primaryColor"
                  value={formData.primaryColor}
                  onChange={handleInputChange}
                  className="w-full p-1 border border-gray-300 rounded-md h-10"
                />
                <span className="py-2 text-sm text-gray-500">{formData.primaryColor}</span>
              </div>
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
                <option value="Emotionally-driven">Emotionally-driven</option>
                <option value="Context-focused">Context-focused</option>
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
                <option value="Short sessions (5-15 min)">Short sessions (5-15 min)</option>
                <option value="Medium sessions (10-20 min)">Medium sessions (10-20 min)</option>
                <option value="Medium-long sessions">Medium-long sessions</option>
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
                <option value="Mobile-first user">Mobile-first user</option>
                <option value="No platform preference">No platform preference</option>
                <option value="Prefers console">Prefers console</option>
                <option value="Prefers PC">Prefers PC</option>
                <option value="Values personal stories">Values personal stories</option>
                <option value="Needs clear guidance">Needs clear guidance</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">XR Experience Level</label>
              <select
                name="xrExperienceLevel"
                value={formData.xrExperienceLevel}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="XR novice">XR novice</option>
                <option value="XR comfortable">XR comfortable</option>
                <option value="XR enthusiast">XR enthusiast</option>
                <option value="XR expert">XR expert</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interaction Preferences</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {['3D Exploration', 'Interactive Navigation', 'Audio Integration', 'Visual Effects'].map(pref => (
                  <label key={pref} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.interactionPreferences?.includes(pref) || false}
                      onChange={() => handleCheckboxChange('interactionPreferences', pref)}
                      className="mr-1"
                    />
                    <span className="text-sm">{pref}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Accessibility Needs</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {['Multiple language options', 'Low-bandwidth alternatives', 'Text formatting for emphasis'].map(need => (
                  <label key={need} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.accessibilityNeeds?.includes(need) || false}
                      onChange={() => handleCheckboxChange('accessibilityNeeds', need)}
                      className="mr-1"
                    />
                    <span className="text-sm">{need}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cultural Context</label>
              <input
                type="text"
                name="culturalContext"
                value={formData.culturalContext}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g. Local heritage connection"
              />
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
              <div ref={svgContainerRef} className="flex-grow flex items-center justify-center">
                <div dangerouslySetInnerHTML={{ __html: generatedSVG }} />
              </div>
            ) : (
              <div className="flex-grow flex items-center justify-center text-gray-500">
                Fill out the form and click "Generate Persona" to see a preview
              </div>
            )}
            {generatedSVG && (
              <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 justify-center">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  onClick={downloadSVG}
                >
                  Download SVG
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-sm text-gray-600 p-4 bg-gray-100 rounded-md">
        <h3 className="font-semibold mb-2">XR Persona Usage Guidelines</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Use personas to inform interaction design decisions for digital heritage experiences</li>
          <li>Consider accessibility needs when designing XR interfaces</li>
          <li>Tailor session length to match persona preferences</li>
          <li>Design interactions that match the persona's experience level</li>
          <li>Create content that resonates with the persona's cultural context and motives</li>
        </ul>
      </div>
    </div>
  );
};

export default XRPersonaGenerator;