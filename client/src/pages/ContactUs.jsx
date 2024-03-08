import { Carousel } from "flowbite-react";
import { useCountries } from "use-react-countries";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";

export default function ContactUs() {
  const { countries } = useCountries();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const submitRequest = async (e) => {
    e.preventDefault();
    if (!formData.firstName || formData.firstName === "") {
      setFirstNameError("The first name field is required");
    } else {
      setFirstNameError(false);
    }
    if (!formData.lastName || formData.lastName === "") {
      setLastNameError("The last name field is required");
    } else {
      setLastNameError(false);
    }
    if (!formData.email || formData.email === "") {
      setEmailError("The email field is required");
    } else {
      setEmailError(false);
    }
    if (!formData.phone || formData.phone === "") {
      setPhoneError("The mobile number field is required");
    } else {
      setPhoneError(false);
    }
    if (!formData.text || formData.text === "") {
      setContentError("The content field is required");
    } else {
      setContentError(false);
    }
  };
  return (
    <div className="min-h-screen font-lato">
      <div className="flex flex-row">
        <div className="hidden md:inline md:w-[300px]"></div>
        <div className="flex-1 relative">
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 relative">
            <Carousel slideInterval={5000}>
              <img
                src="https://miro.medium.com/v2/resize:fit:852/1*mUd3vykZLFMQrM5v55bELQ.jpeg"
                alt="..."
                className="object-cover w-full"
              />
              <img
                src="https://e1.pxfuel.com/desktop-wallpaper/732/624/desktop-wallpaper-call-centre-clouds-solutions-for-small-call-center-thumbnail.jpg"
                alt="..."
                className="object-cover w-full"
              />
              <img
                src="https://cdn.pixabay.com/photo/2017/07/15/09/42/call-center-2505957_640.jpg"
                alt="..."
                className="object-cover w-full"
              />
            </Carousel>
            <div className="w-full inset-0 bg-gradient-to-tr from-pink-600 to-indigo-600/50 absolute"></div>
          </div>

          <div className="flex flex-col md:flex-row p-5">
            <div className="flex-1 hidden md:inline">
              <h3 className="font-semibold">
                Having some challenge navigating through our platform?
              </h3>
              <span>No worries, we go you covered.</span>
              <div>
                <p className="text-sm">
                  You can raise your support ticket here, and we will get back
                  as soon as possible
                </p>
              </div>
              <img src="/customerCare.jpg" alt="..." className="object-cover" />
            </div>
            <div className="flex-1">
              <form
                onSubmit={submitRequest}
                className=" bg-white p-5 w-[500px] mx-auto rounded shadow-lg left-[80px] flex flex-col gap-5"
              >
                <div className="flex flex-col">
                  <label className="text-sm font-semibold">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    id="firstName"
                    onChange={handleChange}
                    className="py-1 px-2 focus:outline-none focus:ring-0 border border-gray-400 rounded focus:bg-blue-50"
                  />
                  {firstNameError && !formData.firstName && (
                    <span className="text-sm text-red-600">
                      {firstNameError}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    id="lastName"
                    onChange={handleChange}
                    className="py-1 px-2 focus:outline-none focus:ring-0 border border-gray-400 rounded focus:bg-blue-50"
                  />
                  {lastNameError && !formData.lastName && (
                    <span className="text-sm text-red-600">
                      {lastNameError}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    onChange={handleChange}
                    className="py-1 px-2 focus:outline-none focus:ring-0 border border-gray-400 rounded focus:bg-blue-50"
                  />
                  {emailError && !formData.email && (
                    <span className="text-sm text-red-600">{emailError}</span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-semibold">Phone</label>
                  <input
                    type="phone"
                    placeholder="Phone"
                    id="phone"
                    onChange={handleChange}
                    className="py-1 px-2 focus:outline-none focus:ring-0 border border-gray-400 rounded focus:bg-blue-50"
                  />
                  {phoneError && !formData.phone && (
                    <span className="text-sm text-red-600">{phoneError}</span>
                  )}
                </div>

                <div className="text-editor">
                  <label className="text-sm font-semibold">
                    Briefly describe your issue
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={formData?.text}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                    }}
                    onChange={(event, editor) => {
                      setFormData({ ...formData, text: editor.getData() });
                    }}
                    onBlur={(event, editor) => {
                      console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  />
                  {contentError && !formData.text && (
                    <span className="text-sm text-red-600">{contentError}</span>
                  )}
                </div>
                <button
                  disabled={loading}
                  className="py-1 w-full flex items-center justify-center gap-1 bg-[#003566] text-white shadow-md hover:shadow-sm transition-all duration-300 hover:opacity-90"
                >
                  {loading && !isError && (
                    <div className="h-5 w-5 border-b-2 border-r-2 border-white rounded-full animate-spin"></div>
                  )}
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
