import React, { useState, useRef } from 'react';

const XRPersonaGenerator = () => {
  const [formData, setFormData] = useState({
    // Basic demographic info
    name: '',
    title: '',
    primaryColor: '#3b82f6', // Default blue
    gender: 'Female',
    ageGroup: '25-34',
    origin: 'Local',
    // XR-specific categories
    focusType: 'Interaction-focused',
    sessionLength: 'Short sessions (5-15 min)',
    platformPref: 'Mobile-first user',
    xrExperienceLevel: 'XR novice',
    accessibilityNeeds: [],
    interactionPreferences: [],
    // XR spatial interaction preferences
    spatialInteractionModel: 'Object manipulation',
    navigationParadigm: 'Linear guided path',
    informationLayering: 'Core narrative focus',
    // Sensory preferences
    audioPreference: 'Minimal audio',
    visualEffectsLevel: 'Subtle',
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
    // Create different face shapes and hairstyles based on gender selection
    let faceFeatures = '';
    
    if (formData.gender === 'Female') {
      // Female avatar with different hair options
      if (formData.ageGroup === '18-24' || formData.ageGroup === '25-34') {
        // Younger female with longer hair
        faceFeatures = `
          <!-- Face -->
          <circle cx="150" cy="80" r="40" fill="#f8d5a8"/>
          <!-- Hair -->
          <path d="M110,80 Q120,40 150,40 Q180,40 190,80" fill="#6b3e2e" stroke="none"/>
          <path d="M110,80 Q120,110 150,120 Q180,110 190,80" fill="#f8d5a8" stroke="none"/>
          <!-- Face features -->
          <path d="M130,90 Q150,110 170,90" stroke="black" stroke-width="2" fill="none"/>
          <!-- Optional collar or accessory -->
          <path d="M130,130 Q150,140 170,130" stroke="#ff9b54" stroke-width="4" fill="none"/>
        `;
      } else {
        // Older female with different hairstyle
        faceFeatures = `
          <!-- Face -->
          <circle cx="150" cy="80" r="40" fill="#f8d5a8"/>
          <!-- Hair -->
          <path d="M110,65 Q130,30 150,30 Q170,30 190,65" fill="#6b3e2e" stroke="none"/>
          <path d="M110,65 Q130,95 150,105 Q170,95 190,65" fill="#f8d5a8" stroke="none"/>
          <!-- Face features -->
          <path d="M130,90 Q150,110 170,90" stroke="black" stroke-width="2" fill="none"/>
        `;
      }
    } else if (formData.gender === 'Male') {
      if (formData.ageGroup === '18-24' || formData.ageGroup === '25-34') {
        // Younger male with modern hairstyle
        faceFeatures = `
          <!-- Face -->
          <circle cx="150" cy="80" r="40" fill="#f8d5a8"/>
          <!-- Hair -->
          <path d="M110,60 Q130,30 150,30 Q170,30 190,60" fill="#1a1a1a" stroke="none"/>
          <!-- Face features -->
          <path d="M130,90 Q150,110 170,90" stroke="black" stroke-width="2" fill="none"/>
          <!-- Optional beard for some males -->
          <path d="M130,100 Q150,125 170,100" fill="#1a1a1a" stroke="none"/>
        `;
      } else {
        // Older male with shorter hair
        faceFeatures = `
          <!-- Face -->
          <circle cx="150" cy="80" r="40" fill="#f8d5a8"/>
          <!-- Short hair -->
          <path d="M110,65 Q130,45 150,45 Q170,45 190,65" fill="#1a1a1a" stroke="none"/>
          <!-- Face features -->
          <path d="M130,90 Q150,110 170,90" stroke="black" stroke-width="2" fill="none"/>
          <!-- Optional glasses -->
          <path d="M125,80 L175,80" stroke="#444" stroke-width="2" fill="none"/>
        `;
      }
    } else {
      // Non-binary or other options with neutral features
      faceFeatures = `
        <!-- Face -->
        <circle cx="150" cy="80" r="40" fill="#f8d5a8"/>
        <!-- Neutral hair -->
        <path d="M110,60 Q130,40 150,40 Q170,40 190,60" fill="#6b3e2e" stroke="none"/>
        <!-- Face features -->
        <path d="M130,90 Q150,110 170,90" stroke="black" stroke-width="2" fill="none"/>
      `;
    }
    
    // Add age and origin indicators
    let ageOriginIndicator = '';
    if (formData.origin === 'International') {
      ageOriginIndicator = `
        <text x="240" y="60" font-family="Arial" font-size="12" text-anchor="middle" fill="#777">International</text>
      `;
    } else {
      ageOriginIndicator = `
        <text x="240" y="60" font-family="Arial" font-size="12" text-anchor="middle" fill="#777">Local</text>
      `;
    }
    
    ageOriginIndicator += `
      <text x="60" y="60" font-family="Arial" font-size="12" text-anchor="middle" fill="#777">${formData.ageGroup}</text>
    `;
    
    // Create accessibility needs section with better text wrapping
    let accessibilitySection = '';
    if (formData.accessibilityNeeds?.length > 0) {
      accessibilitySection = `
        <text x="60" y="550" font-family="Arial" font-size="14" font-weight="bold">Accessibility Needs:</text>
      `;
      
      // Add each accessibility need on its own line
      formData.accessibilityNeeds.forEach((need, index) => {
        accessibilitySection += `
          <text x="70" y="${565 + index * 18}" font-family="Arial" font-size="12">• ${need}</text>
        `;
      });
    }
    
    const svg = `
      <svg width="300" height="${580 + (formData.accessibilityNeeds?.length || 0) * 20}" xmlns="http://www.w3.org/2000/svg">
        <!-- Outer Circle -->
        <circle cx="150" cy="100" r="80" fill="white" stroke="${formData.primaryColor}" stroke-width="6"/>
        
        <!-- Avatar Body Shape -->
        <circle cx="150" cy="120" r="50" fill="${formData.primaryColor}"/>
        
        ${faceFeatures}
        
        ${ageOriginIndicator}
        
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
        
        <!-- Accessibility needs section -->
        ${accessibilitySection}
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
  
  const downloadPNG = () => {
    if (!generatedSVG || !svgContainerRef.current) return;
    
    // Create an image with the SVG data
    const img = new Image();
    const svgBlob = new Blob([generatedSVG], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      // Get the SVG height from the content for proper scaling
      const heightMatch = generatedSVG.match(/height="([^"]+)"/);
      const svgHeight = heightMatch ? parseInt(heightMatch[1]) : 580;
      
      // Create a canvas to render the image
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = svgHeight; // Dynamic height based on content
      const ctx = canvas.getContext('2d');
      
      // Draw a white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw the image
      ctx.drawImage(img, 0, 0);
      
      // Convert to PNG and download
      canvas.toBlob((blob) => {
        const pngUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = pngUrl;
        a.download = `${formData.name.toLowerCase() || 'xr-persona'}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(pngUrl);
        URL.revokeObjectURL(url);
      }, 'image/png');
    };
    
    img.src = url;
  };
  
  const generateRandomPersona = () => {
    // Examples inspired by the provided persona images
    const personas = [
      {
        name: 'Gwen',
        title: 'The narrative game connoisseur',
        primaryColor: '#9c27b0', // purple
        gender: 'Female',
        ageGroup: '25-34',
        origin: 'Local',
        focusType: 'Story-focused',
        sessionLength: 'Medium sessions (10-20 min)',
        platformPref: 'Prefers PC',
        xrExperienceLevel: 'XR comfortable',
        accessibilityNeeds: [],
        interactionPreferences: ['Visual Effects', 'Interactive Navigation'],
        spatialInteractionModel: 'Free exploration',
        navigationParadigm: 'Non-linear exploration',
        informationLayering: 'Emotional layer emphasis',
        audioPreference: 'Minimal audio',
        visualEffectsLevel: 'Moderate',
        culturalContext: 'Content curator',
        motives: ['Fully consume the content of the game', 'Track progress of collectibles', 'Manually save and manage game states']
      },
      {
        name: 'Alvin',
        title: 'The indulgent gamer',
        primaryColor: '#f59e0b', // amber
        gender: 'Male',
        ageGroup: '25-34',
        origin: 'Local',
        focusType: 'Theme-focused',
        sessionLength: 'Long sessions',
        platformPref: 'Prefers console',
        xrExperienceLevel: 'XR enthusiast',
        accessibilityNeeds: [],
        interactionPreferences: ['3D Exploration', 'Interactive Navigation'],
        spatialInteractionModel: 'Object manipulation',
        navigationParadigm: 'Free roaming',
        informationLayering: 'Interactive layer priority',
        audioPreference: 'Ambient soundscapes',
        visualEffectsLevel: 'Immersive',
        culturalContext: 'Relies on curation',
        motives: ['Fully consume the story of the game', 'Track progress of collectibles', 'Objective notifications and aids']
      },
      {
        name: 'Matias',
        title: 'The portable gamer',
        primaryColor: '#3b82f6', // blue
        gender: 'Male',
        ageGroup: '18-24',
        origin: 'Local',
        focusType: 'Interaction-focused',
        sessionLength: 'Short sessions (5-15 min)',
        platformPref: 'Prefers Portable PC/console',
        xrExperienceLevel: 'XR novice',
        accessibilityNeeds: [],
        interactionPreferences: ['3D Exploration'],
        spatialInteractionModel: 'Fixed viewpoints',
        navigationParadigm: 'Linear guided path',
        informationLayering: 'Core narrative focus',
        audioPreference: 'Minimal audio',
        visualEffectsLevel: 'Subtle',
        culturalContext: '',
        motives: ['Enjoy the experience playing the game', 'Clear and intuitive interaction prompts', 'Skippable dialogue and cinematics']
      },
      {
        name: 'Li',
        title: 'The grapevine gamer',
        primaryColor: '#ef4444', // red
        gender: 'Female',
        ageGroup: '18-24',
        origin: 'Local',
        focusType: 'Character-focused',
        sessionLength: 'Short sessions (5-15 min)',
        platformPref: 'No platform preference',
        xrExperienceLevel: 'XR novice',
        accessibilityNeeds: [],
        interactionPreferences: ['Audio Integration', 'Visual Effects'],
        spatialInteractionModel: 'Guided tour',
        navigationParadigm: 'Linear guided path',
        informationLayering: 'Emotional layer emphasis',
        audioPreference: 'Interactive audio feedback',
        visualEffectsLevel: 'Moderate',
        culturalContext: 'Word-of-mouth',
        motives: ['Enjoy the art and characters of the game', 'Clear and intuitive interaction prompts', 'Objective notifications and aids']
      },
      {
        name: 'Themba',
        title: 'The heritage seeker',
        primaryColor: '#10b981', // emerald
        gender: 'Male',
        ageGroup: '25-34',
        origin: 'Local',
        focusType: 'Interaction-focused',
        sessionLength: 'Short sessions (5-15 min)',
        platformPref: 'Mobile user',
        xrExperienceLevel: 'XR novice',
        accessibilityNeeds: [],
        interactionPreferences: ['Audio Integration', 'Visual Effects'],
        spatialInteractionModel: 'Guided tour',
        navigationParadigm: 'Linear guided path',
        informationLayering: 'Core narrative focus',
        audioPreference: 'Narration focused',
        visualEffectsLevel: 'Subtle',
        culturalContext: 'Connect with heritage',
        motives: ['Connect with heritage', 'Share on social media', 'Brief, impactful experiences']
      },
      {
        name: 'Aisha',
        title: 'The international tourist',
        primaryColor: '#dc2626', // red
        gender: 'Female',
        ageGroup: '35-44',
        origin: 'International',
        focusType: 'Story-focused',
        sessionLength: 'Medium sessions (10-20 min)',
        platformPref: 'No platform preference',
        xrExperienceLevel: 'XR novice',
        accessibilityNeeds: ['Multiple language options'],
        interactionPreferences: ['Audio Integration'],
        spatialInteractionModel: 'Guided tour',
        navigationParadigm: 'Linear guided path',
        informationLayering: 'Context layer preference',
        audioPreference: 'Narration focused',
        visualEffectsLevel: 'Moderate',
        culturalContext: 'Learn about apartheid',
        motives: ['Learn about apartheid', 'Emotional connection', 'Language accessibility']
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
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-binary">Non-binary</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age Group</label>
                <select
                  name="ageGroup"
                  value={formData.ageGroup}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55+">55+</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
              <select
                name="origin"
                value={formData.origin}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Local">Local</option>
                <option value="International">International</option>
              </select>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Spatial Interaction Model</label>
              <select
                name="spatialInteractionModel"
                value={formData.spatialInteractionModel}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Object manipulation">Object manipulation (spin, zoom, exploded views)</option>
                <option value="Fixed viewpoints">Fixed viewpoints (preset perspectives)</option>
                <option value="Free exploration">Free exploration (user-controlled camera)</option>
                <option value="Guided tour">Guided tour (automated movement)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Navigation Paradigm</label>
              <select
                name="navigationParadigm"
                value={formData.navigationParadigm}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Linear guided path">Linear guided path</option>
                <option value="Non-linear exploration">Non-linear exploration ("Go to Step" actions)</option>
                <option value="Free roaming">Free roaming (complete freedom)</option>
                <option value="Hybrid approach">Hybrid approach (both guided and free)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Information Layering</label>
              <select
                name="informationLayering"
                value={formData.informationLayering}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Core narrative focus">Core narrative focus (essential historical facts)</option>
                <option value="Interactive layer priority">Interactive layer priority (explorable details)</option>
                <option value="Emotional layer emphasis">Emotional layer emphasis (personal testimonies)</option>
                <option value="Context layer preference">Context layer preference (global connections)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Audio Preference</label>
              <select
                name="audioPreference"
                value={formData.audioPreference}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Minimal audio">Minimal audio</option>
                <option value="Narration focused">Narration focused</option>
                <option value="Ambient soundscapes">Ambient soundscapes</option>
                <option value="Interactive audio feedback">Interactive audio feedback</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Visual Effects Level</label>
              <select
                name="visualEffectsLevel"
                value={formData.visualEffectsLevel}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Subtle">Subtle (minimalist approach)</option>
                <option value="Moderate">Moderate (balanced effects)</option>
                <option value="Immersive">Immersive (rich visual feedback)</option>
                <option value="Adaptive">Adaptive (context-sensitive)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Accessibility Needs</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {['Multiple language options', 'Low-bandwidth alternatives', 'Text formatting for emphasis', 'Audio descriptions', 'Motion sensitivity options'].map(need => (
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
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  onClick={downloadPNG}
                >
                  Download PNG
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-sm text-gray-600 p-4 bg-gray-100 rounded-md">
        <h3 className="font-semibold mb-2">XR Persona Usage Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div>
            <h4 className="font-medium mb-1">Interaction Design</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Match spatial interaction model to persona's XR experience level</li>
              <li>Design navigation flows based on persona's navigation paradigm preference</li>
              <li>Layer information according to persona's information layering preference</li>
              <li>Tailor session length to match persona attention spans</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-1">Content & Experience</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Balance audio elements based on persona's audio preference</li>
              <li>Adjust visual effects intensity to match persona comfort level</li>
              <li>Create content that resonates with the persona's cultural context</li>
              <li>Design interactions that fulfill the persona's primary motives</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-1">Accessibility Considerations</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Implement multiple language options for international visitors</li>
              <li>Provide low-bandwidth alternatives for mobile-first users</li>
              <li>Include audio descriptions for enhanced accessibility</li>
              <li>Add motion sensitivity options for comfortable viewing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-1">XR-Specific Design</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Consider viewing device constraints (mobile vs headset)</li>
              <li>Design for cognitive load appropriate to experience level</li>
              <li>Balance between guided experiences and free exploration</li>
              <li>Implement "Go to Step" actions for non-linear navigation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XRPersonaGenerator;