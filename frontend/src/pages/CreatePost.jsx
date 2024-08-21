import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ImCross } from 'react-icons/im';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { URL } from '../url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure you import the Toastify CSS

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  const navigate = useNavigate();

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1); // Corrected to remove the item at index i
    setCats(updatedCats);
  };

  const addCategory = () => {
    if (cat && !cats.includes(cat)) { // Ensure category is not empty and not already added
      let updatedCats = [...cats];
      updatedCats.push(cat);
      setCat(""); // Clear the input field
      setCats(updatedCats);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      try {
        await axios.post(URL+"/api/upload", data);
        toast.success("Image uploaded successfully!"); 
      } catch (err) {
        console.log(err);
        toast.error("Failed to upload image."); 
      }
    }

    try {
      const res = await axios.post(URL+"/api/posts/create", post, { withCredentials: true });
      toast.success("Post created successfully!"); // Toastify notification on post creation success
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
      toast.error("Failed to create post."); // Toastify notification on post creation failure
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex justify-center'>
        <div className='px-6 m-4 border flex flex-col w-[70%] shadow-xl md:px-[200px] mt-8'>
          <h1 className='font-bold md:text-2xl text-2xl mt-3 flex justify-center'>Create a post</h1>
          <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder='Enter post title'
              className='px-4 py-2 border-2 border-black outline-none rounded-md'
            />
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              className='px-4 border-2 border-black rounded-md'
            />
            <div className='flex flex-col'>
              <div className='flex items-center space-x-4 md:space-x-8'>
                <input
                  className='px-4 py-2 border-2 border-black outline-none rounded-md'
                  placeholder='Enter post category'
                  type="text"
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                />
                <div
                  onClick={addCategory}
                  className='bg-black text-white px-4 py-2 font-semibold cursor-pointer rounded-md'
                >
                  Add
                </div>
              </div>

              {/* Categories */}
              <div className='flex px-4 mt-3 flex-wrap'>
                {cats?.map((c, i) => (
                  <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                    <p>{c}</p>
                    <p
                      onClick={() => deleteCategory(i)}
                      className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'
                    >
                      <ImCross />
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              rows={9}
              cols={30}
              className='px-4 py-2 border-2 border-black outline-none rounded-md'
              placeholder='Enter post description'
            />
            <button
              onClick={handleCreate}
              className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg rounded-md'
            >
              Create
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
