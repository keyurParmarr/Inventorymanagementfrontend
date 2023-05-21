import "./Productform.style.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../CARD/Card";
export const Productform = ({
  product,
  productimg,
  imagePreview,
  description,
  setDescription,
  handleImageChange,
  handleInputChange,
  saveProduct,
}) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className="--color-dark">
              Supported Formats:jpeg, jpg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            {imagePreview !== null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="Product Image" />
              </div>
            ) : (
              <p>No Image set for this Product.</p>
            )}
          </Card>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={product?.name}
            placeholder="Product Name"
          />
          <label>Product Category</label>
          <input
            type="text"
            name="category"
            onChange={handleInputChange}
            value={product?.category}
            placeholder="Product Category"
          />
          <label>Product Price</label>
          <input
            type="text"
            name="price"
            onChange={handleInputChange}
            value={product?.price}
            placeholder="Product Price"
          />
          <label>Product Quantity</label>
          <input
            type="text"
            name="quantity"
            onChange={handleInputChange}
            value={product?.quantity}
            placeholder="Product Quantity"
          />
          <label>Product Description</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={Productform.modules}
            formats={Productform.formats}
          />
          <div className="--my">
            <button className="--btn --btn-primary" type="submit">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

Productform.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
Productform.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];
