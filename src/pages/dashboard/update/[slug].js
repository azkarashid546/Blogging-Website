import React, { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });


const edit = ({singleBlog}) => {
  const router = useRouter();
  const slug = router.query.slug;
  const editor = useRef(null);
  const [loader, setloader] = useState(false);

  const [tempImage, setTempImage] = useState("");

  console.log(tempImage);

  const [formData, setFormData] = useState({
    title: singleBlog.message.title,
    stitle: singleBlog.message.stitle,
    mtitle: singleBlog.message.mtitle,
    mdiscription: singleBlog.message.mdiscription,
    category: singleBlog.message.category,
    author: singleBlog.message.author,
    discription: singleBlog.message.discription,
    alttext: singleBlog.message.alttext,
  });

  const handleOncahange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const uploadImage = async () => {
    try {
      const data = new FormData();
      data.append("file", tempImage);
      data.append("upload_preset", "blogs_preset");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dk723mstd/image/upload",
        {
          body: data,
          method: "POST",
        }
      );

      const jsonRes = await res.json();
      console.log(jsonRes.secure_url);
      return jsonRes.secure_url;
    } catch (error) {
      alert("something went wrong with the image");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
        const data = await fetch(`/api/blogs/${slug}`);
        const response = await data.json();
        console.log("update blog" ,response.message);
        setFormData({
          title: response?.singleBlog?.title,
          stitle: response?.singleBlog?.stitle,
          mtitle: response?.singleBlog?.mtitle,
          mdiscription: response?.singleBlog?.mdiscription,
          category: response?.singleBlog?.category,
          author: response?.singleBlog?.author,
          discription: response?.singleBlog?.discription,
          alttext: response?.singleBlog?.alttext,
        });
      }
        fetchData();
    
      },[]);
  
      const handleUpdate = async (e) => {
        try {
          e.preventDefault();
          setloader(true);
          const imageUrl = await uploadImage();
          const res = await axios.put(`/api/blogs/${slug}`, {
            ...formData,
            picture: imageUrl,
          });
          res && toast.success("Blog has been updated sucessfully!");
          router.push("/dashboard");
        } catch (error) {
          if (error?.res?.singleBlog?.message) {
            toast.error(error.res.singleBlog.message);
          }
        } finally {
          setloader(false);
        }
      };
  
    

  const handleReset = (e) => {
    setFormData({
      title: "",
      stitle: "",
      mtitle: "",
      mdiscription: "",
      category: "",
      author: "",
      discription: "",
      alttext: "",
    });
    setTempImage("");
  };
  return (
    <>
      <div className="addblog">
        <Toaster />
        <div className="addblog-form">
          <div className="addblog-heading">
            <h1>Update Blog</h1>
          </div>
          <form>
            <div className="form-field">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleOncahange}
                placeholder="Enter the Title"
              />
            </div>
            <div className="form-field">
              <label htmlFor="stitle">Sub Title</label>
              <input
                type="text"
                id="stitle"
                name="stitle"
                value={formData.stitle}
                onChange={handleOncahange}
                placeholder="Enter the Sub Title"
              />
            </div>
            <div className="form-field">
              <label htmlFor="mtitle">Meta Title</label>
              <input
                type="text"
                id="mtitle"
                name="mtitle"
                value={formData.mtitle}
                onChange={handleOncahange}
                placeholder="Enter the Meta Title"
              />
            </div>
            <div className="form-field">
              <label htmlFor="mdiscription">Meta Discription</label>
              <input
                type="text"
                id="mdiscription"
                name="mdiscription"
                value={formData.mdiscription}
                onChange={handleOncahange}
                placeholder="Enter the Meta Discription"
              />
            </div>
            <div className="form-field">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleOncahange}
              >
                <option value="choose option">Choose Option</option>
                <option value="fashion">Fashion</option>
                <option value="food">Food</option>
                <option value="headline">headline</option>
                <option value="photography">Photography</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="technology">Technoloy</option>
                <option value="travel">Travel</option>
                <option value="health">Health</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleOncahange}
                placeholder="Enter the Author"
              />
            </div>
           

            <div className="form-field">
              <label htmlFor="discription">Discription</label>
              <JoditEditor
                placeholder="Start Writing"
                className="jodit"
                ref={editor}
                value={formData.discription}
                tabIndex={1}
                onBlur={(v) => setFormData({ ...formData, discription: v })}
                onChange={(v) => setFormData({ ...formData, discription: v })}
              />
            </div>
            <div className="add-img">
              {tempImage ? (
                <div className="trace" style={{ display: "none" }}>
                  <label htmlFor="image">Upload Image</label>
                  <input
                    type="file"
                    onChange={(e) => setTempImage(e.target.files[0])}
                  />
                </div>
              ) : (
                <div className="trace">
                  <div className="img-icon">
                    <img
                      style={{ marginTop: "40px" }}
                      src="/assets/cloud/upload.webp"
                      alt=""
                      className="upload-image-class"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="image" className="upload-image">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      onChange={(e) => setTempImage(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              )}

              {tempImage && (
                <div className="uploaded-img">
                  <div className="font-cross">
                    <i
                      class="fa-solid fa-xmark fa-lg"
                      onClick={(e) => {
                        setTempImage("");
                      }}
                    ></i>
                  </div>
                  <div className="display-image">
                    <img src={URL.createObjectURL(tempImage)} />
                  </div>
                </div>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="alttext">Alternate Text</label>
              <input
                type="text"
                id="alttext"
                name="alttext"
                value={formData.alttext}
                onChange={handleOncahange}
                placeholder="Enter the Alternate Text"
              />
            </div>

            <div className="form-btn">
              <div className="upload-btn">
                <button onClick={handleUpdate} disabled={loader}>
                  {loader ? "uploading.." : "upload"}
                </button>
              </div>
              <div className="reset-btn">
                <button onClick={handleReset}>Reset</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default edit;
export async function getServerSideProps({params}) {
  const singleResponse = await fetch(`http://localhost:3000/api/blogs/${params.slug}`);
  const singleData = await singleResponse.json();

  return {
    props: {
      singleBlog : singleData,
    },
  };
}