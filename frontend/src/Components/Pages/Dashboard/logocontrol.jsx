import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setLogosrc } from '../../Store/slices/settingSlice/settingSlice';
const LogoComponent = ({ id,initialPosition }) => {
  const dispatch = useDispatch()
  // const [logoSrc,setLogoSrc]= useState()
  const logoSrc = useSelector((state)=>state.settings.logosrc[id]);
  function logoupload() {
    
    const fileInput = document.getElementById(`logo-upload-input-${id}`);
  
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
  
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const newLogo = e.target.result
          // setLogoSrc(newLogo)
          dispatch(setLogosrc({ id, src: newLogo }));
          // console.log(e.target.result)
          const avatarImage =  document.getElementById(`logo-upload-input-${id}`);
          avatarImage.setAttribute('src', e.target.result);
        };
  
        reader.readAsDataURL(file);
      }
    });
  
    // Trigger the file input dialog
    fileInput.click();
  }
   const [isDragging, setIsDragging] = useState(false);
   const [position, setPosition] = useState(initialPosition ||{ x: 0, y: 0 });
   useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);
  const handleMouseDown = (event) => {
    setIsDragging(true);

    const offsetX = event.clientX - position.x;
    const offsetY = event.clientY - position.y;

    const handleMouseMove = (event) => {
      if (isDragging === true) {
        const newX = event.clientX - offsetX;
        const newY = event.clientY - offsetY;
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
    <div
      style={{
        position: "relative",
        left: position.x,
        top: position.y,
        cursor: isDragging ? "move" : "resize",
      }}
      onMouseDown={handleMouseDown}
    >
     {/* <div className="reportheaderlogo"> */}
                    <div className="avatar-wrapper" onClick={logoupload}>
                        <img className="profile-pic" src={logoSrc} alt="logo"/>
                        <div className="upload-button">
                          <i
                            className="fa fa-arrow-circle-up"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <input
                        id={`logo-upload-input-${id}`}
                          className="file-upload"
                          type="file"
                          accept="image/*"
                          
                        />
                      </div>
                      </div>
                      {/* </div> */}
    </>
  );
};

export default LogoComponent;
