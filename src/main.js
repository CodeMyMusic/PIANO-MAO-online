import rainBowAnimation from './components/OUI.js'
import synth from './components/piano3D.js'
import trackView from "./components/trackView.js"

// import toolBar from './components/toolBar/main.js'

import scheme from './theme.js'

window.addEventListener('DOMContentLoaded', function () { 
    rainBowAnimation()  
    synth();
    trackView()
    // toolBar()
})

/* window.addEventListener('beforeunload', (e) => {
    e.returnValue = 'All unsaved work will be lost';
  }); */
  