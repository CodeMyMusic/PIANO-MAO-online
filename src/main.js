import rainBowAnimation from './OUI.js'
import synth from "./piano3D.js"
import trackView from "./trackView.js"

window.addEventListener('DOMContentLoaded', function () { 
    rainBowAnimation()  
    synth();
    trackView()
})

/* window.addEventListener('beforeunload', (e) => {
    e.returnValue = 'All unsaved work will be lost';
  }); */
  