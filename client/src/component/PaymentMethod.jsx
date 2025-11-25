import { useState } from "react";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import qrImg from "../assets/Qr.jpg";

function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState("cod");

  return (
    <div className="border rounded-md p-4 bg-white mt-4 font-paragraph text-sm shadow-sm">

      {/* Payment Options */}
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={selectedMethod === "cod"}
            onChange={() => setSelectedMethod("cod")}
            className="accent-primary"
          />
          <span className="font-medium">Cash on Delivery</span>
        </label>

        <label className="flex items-center gap-2 border-t pt-3 cursor-pointer">
          <input
            type="radio"
            checked={selectedMethod === "esewa"}
            onChange={() => setSelectedMethod("esewa")}
            className="accent-primary"
          />
          <span className="font-medium">eSewa</span>
        </label>
      </div>

      {/* eSewa QR Section */}
      {selectedMethod === "esewa" && (
        <div className="mt-4 text-center">
          <img
            src={qrImg}
            alt="QR Code"
            className="w-40 mx-auto mb-3 rounded-md shadow-sm"
          />

          <p className="font-medium mb-2">Upload Payment Screenshot</p>

          <label className="block w-full border border-dashed rounded-md p-6 cursor-pointer hover:bg-secondary transition">
            <input type="file" className="hidden" />
            <div className="flex flex-col items-center">
              <MdOutlineDriveFolderUpload className="text-4xl text-primary" />
              <p className="text-sm mt-2">
                Drop your image here, or{" "}
                <span className="text-info font-medium">browse</span>
              </p>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}

export default PaymentMethod;
