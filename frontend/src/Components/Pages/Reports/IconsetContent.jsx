import React,{useState} from 'react'
import uparrowicon from '../../../Assets/ConditionalIcons/uparrow.svg';
import downarrowicon from '../../../Assets/ConditionalIcons/downarrow.svg';
import rightarrowicon from '../../../Assets/ConditionalIcons/rightarrow.svg';
import grayuparrowicon from '../../../Assets/ConditionalIcons/grayuparrow.svg';
import graydownarrowicon from '../../../Assets/ConditionalIcons/graydownarrow.svg';
import grayrightarrowicon from '../../../Assets/ConditionalIcons/grayrightarrow.svg';
import upicon from '../../../Assets/ConditionalIcons/greenup.svg';
import downicon from '../../../Assets/ConditionalIcons/redtriangle.svg';
import hypenicon from '../../../Assets/ConditionalIcons/hypen.svg';
import greencircleicon from '../../../Assets/ConditionalIcons/greencircle.svg';
import redcircleicon from '../../../Assets/ConditionalIcons/redcircle.svg';
import yellowcircleicon from '../../../Assets/ConditionalIcons/yellowcircle.svg';
import yellowtriangleicon from '../../../Assets/ConditionalIcons/yellowtriangle.svg';
import redcube from '../../../Assets/ConditionalIcons/redcube.svg';
import wrong from '../../../Assets/ConditionalIcons/wrong.svg';
import app1 from '../../../Assets/ConditionalIcons/app1.svg'
import app2 from '../../../Assets/ConditionalIcons/app2.svg'
import app0 from '../../../Assets/ConditionalIcons/app0.svg';
import appfull from '../../../Assets/ConditionalIcons/appfull.svg'
import appmt from '../../../Assets/ConditionalIcons/appmt.svg'
import greensignallighticon from '../../../Assets/ConditionalIcons/greensignallight.svg';
import yellowsignallighticon from '../../../Assets/ConditionalIcons/yellowsignallight.svg';
import redsignallighticon from '../../../Assets/ConditionalIcons/redsignallight.svg';
import pinkcircleicon from '../../../Assets/ConditionalIcons/pinkcircle.svg';
import blackcircleicon from '../../../Assets/ConditionalIcons/blackcircle.svg';
import graycircleicon from '../../../Assets/ConditionalIcons/graycircle.svg';
import greentickcircleicon from '../../../Assets/ConditionalIcons/roundedtick.svg';
import exclamationicon from '../../../Assets/ConditionalIcons/roundedexclamation.svg';
import tick from '../../../Assets/ConditionalIcons/tick.svg';
import yellowflagicon from '../../../Assets/ConditionalIcons/yellowflag.svg';
import greenflagicon from '../../../Assets/ConditionalIcons/greenflag.svg';
import redflagicon from '../../../Assets/ConditionalIcons/redflag.svg';
import crossicon from '../../../Assets/ConditionalIcons/cross.svg';
import yellowexclamination from '../../../Assets/ConditionalIcons/exclamatry.svg';
import starhalfyellowicon from '../../../Assets/ConditionalIcons/starhalfyellowicon.svg';
import signalicon from '../../../Assets/ConditionalIcons/signal.svg';
import signalweekicon from '../../../Assets/ConditionalIcons/signal1.svg';
import signal2icon from '../../../Assets/ConditionalIcons/signal2.svg';
import signal3icon from '../../../Assets/ConditionalIcons/signal3.svg';
import yellowstaricon from '../../../Assets/ConditionalIcons/yellowstar.svg';
import staremptyicon from '../../../Assets/ConditionalIcons/staremptyicon.svg';
import rsarrow from '../../../Assets/ConditionalIcons/rsarrow.svg';
import rsdarrow from '../../../Assets/ConditionalIcons/rsdarrow.svg';
import yellowrsarrow from '../../../Assets/ConditionalIcons/yellowrsarrow.svg';
import yellowrsdarrow from '../../../Assets/ConditionalIcons/yellowrsdarrow.svg';
import halfcircle from '../../../Assets/ConditionalIcons/halfcircle.svg';
import circle25 from '../../../Assets/ConditionalIcons/circle25.svg';
import circle75 from '../../../Assets/ConditionalIcons/circle75.svg';
import circle from '../../../Assets/ConditionalIcons/circle.svg';
import signalmt from '../../../Assets/ConditionalIcons/signalempty.svg';

const IconsetContent = () => {
  const [selectedArrow, setSelectedArrow] = useState(false);
  const [iconsrc,setIconsrc] = useState(null)
  const handleArrowClick = (arrowType) => {
    // Update the state with the selected arrow type
    setSelectedArrow(!selectedArrow);
 setIconsrc(arrowType)
    // You can also save the selected arrow type to your data or perform any other actions here
    console.log("Selected arrow:", arrowType);
  };

  return (
   
     <>
   <div className='iconsetdiv'>
     <div className="iconsetcontentheader">Directional</div>
      <div className='iconsetContainer'>
        <div className='rowicon'>
        <div>
        <img src={uparrowicon} alt='&uarr;'  height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('uparrowicon')} />
        <img src={rightarrowicon} alt='&rarr;;' height="20px" width='20px' style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('rightarrowicon')} />
        <img src={downarrowicon} alt='&darr;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('downarrowicon')} />
        </div>
       <div className='grayarrow'>
       <img src={grayuparrowicon} alt='&uarr;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('grayuparrowiconp')} />
        <img src={grayrightarrowicon} alt='&rarr;;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('grayrightarrowicon')} />
        <img src={graydownarrowicon} alt='&darr;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('graydownarrowicon')} />
       </div>
        </div>
        <div className='rowicon'>
        <div>
        <img src={upicon} alt='&uarr;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('upicon')} />
        <img src={hypenicon} alt='&rarr;;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('hypenicon')}  />
        <img src={downicon} alt='&darr;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('downicon')}  />
        </div>
        <div className='grayarrow'>
        <img src={grayuparrowicon} alt='&uarr;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === 'true' ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('grayuparrowicon')} />
        <img src={rsarrow} alt='&rarr;;' height="20px" width='20px' style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('rsarrow')} />
        <img src={rsdarrow} alt='&darr;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('rsdarrow')} />
        <img src={graydownarrowicon} alt='&darr;' height="20px" width='20px' style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('graydownarrowicon')} />
        </div>
        </div>
        <div className='rowicon'>
        <div>
        <img src={uparrowicon} alt='&uarr;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow ===true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('uparrowicon')} />
        <img src={yellowrsarrow} alt='&rarr;;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('uyellowrsarrowp')} />
        <img src={yellowrsdarrow} alt='&rarr;;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('yellowrsdarrow')}  />
        <img src={downarrowicon} alt='&darr;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('downarrowicon')} />
        </div>
        <div className='grayarrow'>
        <img src={grayuparrowicon} alt='&uarr;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('grayuparrowicon')} />
        <img src={rsarrow} alt='&rarr;;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('rsarrow')}  />
        <img src={grayrightarrowicon} alt='&rarr;;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('grayrightarrowicon')} />
        <img src={rsdarrow} alt='&darr;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('rsdarrow')}  />
        <img src={graydownarrowicon} alt='&darr;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('graydownarrowicon')}  />
        </div>
        </div>
        <div className='rowicon'>
        <div>
        <img src={uparrowicon} alt='&uarr;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('uparrowicon')} />
        <img src={yellowrsarrow} alt='&rarr;;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('yellowrsarrow')}  />
        <img src={rightarrowicon} alt='&rarr;;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('rightarrowicon')} />
        <img src={yellowrsdarrow} alt='&rarr;;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('yellowrsdarrow')} />
        <img src={downarrowicon} alt='&darr;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('downarrowicon')}  />
        </div>
        
        </div>
      
       </div>
<div className="iconsetcontentheader">Shapes</div>
<div className='iconsetContainer'>
  <div className='rowicon'>
  <div>
        <img src={greencircleicon} alt='&uarr;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('greencircleicon')} />
        <img src={yellowcircleicon} alt='&rarr;;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('yellowcircleicon')}  />
        <img src={redcircleicon} alt='&darr;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('redcircleicon')}  />
        </div>
        <div className='grayarrow'>
        <img src={greensignallighticon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('greensignallighticon')} />
        <img src={yellowsignallighticon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('yellowsignallighticon')} />
        <img src={redsignallighticon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('redsignallighticon')} />
        
        </div>
  </div>
  <div className='rowicon'>
  <div>
        <img src={greencircleicon} alt='&uarr;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('greencircleicon')} />
        <img src={yellowtriangleicon} alt='&rarr;;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('yellowtriangleicon')}  />
        <img src={redcube} alt='&darr;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('redcube')}  />
        </div>  
        <div className='grayarrow'>
        <img src={greencircleicon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('greencircleicon')} />
        <img src={yellowcircleicon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('yellowcircleicon')} />
        <img src={redcircleicon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('redcircleicon')} />
        <img src={blackcircleicon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('blackcircleicon')} />
        </div>   
  </div>
       
        <div>
        <img src={redcircleicon}alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('redcircleicon')} />
        <img src={pinkcircleicon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow ===true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('pinkcircleicon')} />
        <img src={graycircleicon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('graycircleicon')} />
        <img src={blackcircleicon}alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('ublackcircleiconp')} />
        </div>
</div>
<div className="iconsetcontentheader">Indicaters</div>
<div className='rowicon'>
<div>
        <img src={greentickcircleicon} alt='&uarr;' height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('greentickcircleicon')} />
        <img src={exclamationicon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('exclamationicon')} />
        <img src={wrong} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('wrong')} />
        </div>
        <div className='grayarrow'>
        <img src={tick} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('tick')} />
        <img src={yellowexclamination} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('yellowexclamination')} />
        <img src={crossicon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('crossicon')} />
        </div>
</div>

        <div>
        <img src={greenflagicon}alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow ===true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('greenflagicon')} />
        <img src={yellowflagicon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('yellowflagicon')} />
        <img src={redflagicon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('redflagicon')} />
        
        </div>
<div className='iconsetContainer'></div>
<div className="iconsetcontentheader">Rating</div>
<div className='iconsetContainer'>
  <div className='rowicon'>
  <div>
  <img src={yellowstaricon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('yellowstaricon')} />
  <img src={starhalfyellowicon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('starhalfyellowicon')} />
  <img src={staremptyicon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('staremptyicon')} />
  </div>
  <div className='grayarrow'>
  <img src={signalweekicon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('signalweekicon')} />
  <img src={signal2icon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('signal2icon')} />
  <img src={signal3icon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('signal3icon')} />
  <img src={signalicon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('signalicon')} />
  </div>
  </div>
  <div className='rowicon'>
  <div>
  <img src={blackcircleicon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('blackcircleicon')} />
  <img src={circle25} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('circle25')} />
  <img src={halfcircle}alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('halfcircle')} />
  <img src={circle75} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('circle75')} />
  <img src={circle} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('circle')} />
  </div>
  <div className='grayarrow'>
  <img src={signalmt} alt=''height="20px" width="20px"className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('signalmt')} />
  <img src={signalweekicon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('signalweekicon')} />
  <img src={signal2icon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow ===true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('signal2icon')} />
  <img src={signal3icon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('signal3icon')} />
  <img src={signalicon} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('signalicon')} />
  </div>
  </div>
  
  <div>
  <img src={appfull} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('appfull')} />
  <img src={app1} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow ===true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('app1')} />
  <img src={app2} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('app2')} />
  <img src={app0} alt="" height="20px" width='20px'style={{paddingRight:"2px"}} className={`iconclick ${selectedArrow === true ? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('app0')} />
  <img src={appmt} alt="" height="20px" width='20px'style={{paddingRight:"2px"}}className={`iconclick ${selectedArrow === true? 'selected-arrow' : ''}`}onClick={() => handleArrowClick('appmt')} />
  </div>
 
</div>
       
      
      </div>
      </>
   
  )
}

export default IconsetContent