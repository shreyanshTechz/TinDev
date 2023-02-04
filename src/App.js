import logo from './logo.svg';
import SignIn from "./signin"
import './App.css';
import {useState ,useEffect} from "react";
import {storage} from "./fbconfig";
import { ref,uploadBytes,listAll,getDownloadURL } from 'firebase/storage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {v4} from 'uuid'
// import {auth} from './fbconfig'
import Login from './login';
function App() {
  // console.log(auth);
  const [imageUpload,setImageUpload] = useState(null);
  const [imageList , setImageList] = useState([]);

  const imageListref = ref(storage ,"images/");
  const uploadimage = ()=>{
      if (imageUpload==null) return;
      const imageref = ref(storage,`images/${imageUpload.name}`);
      uploadBytes(imageref,imageUpload).then((snapshot)=>{
        getDownloadURL(snapshot.ref).then((url)=>{
          setImageList((prev) => [...prev,url]);
          // console.log(url);
        })
        // alert("Uploaded");
      })
  }
  useEffect(() => {
    listAll(imageListref).then((res)=>{
      console.log(res);
      res.items.forEach((items)=>{
        getDownloadURL(items).then((url)=>{
          setImageList((prev) => [...prev,url]);
          // console.log(url);
        })
      })
    })
  }, [])
  
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
        <div className="App">
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/signin' element={<SignIn />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
