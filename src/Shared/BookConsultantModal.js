import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const BookConsultantModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSubmitted = localStorage.getItem("hasVisitedForConsultation");

    if (!hasSubmitted) {
      // Show modal with a small delay for better UX
      const timer = setTimeout(() => {
        setOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    localStorage.setItem("hasVisitedForConsultation", "true");
    // For now, just close the modal
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px', overflow: 'hidden' } }}>
      <div className="bg-gray-100 p-6 flex flex-col items-center justify-center relative text-center border-b">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-800"
        >
          <IoMdClose size={24} />
        </button>
        <Typography variant="h2" className="!font-bold !text-gray-800 !mb-2">
          Ready to Transform Your Business?
        </Typography>
        <Typography variant="body2" className="!text-gray-600">
          Book a free consultation with our experts today.
        </Typography>
      </div>
      <form onSubmit={handleSubmit} className="bg-white">
        <DialogContent className="!p-6 !pt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <TextField
              size="small"
              fullWidth
              label="Full Name"
              variant="outlined"
              required
            />
            <TextField
              size="small"
              fullWidth
              label="Email Address"
              type="email"
              variant="outlined"
              required
            />
            <TextField
              size="small"
              fullWidth
              label="Phone Number"
              type="tel"
              variant="outlined"
            />
            <TextField
              size="small"
              fullWidth
              label="Company Name"
              variant="outlined"
            />
          </div>
          <TextField
            size="small"
            fullWidth
            label="How can we help you?"
            multiline
            rows={2}
            variant="outlined"
            required
            className="!mb-2"
          />
        </DialogContent>
        <DialogActions className="!px-6 !pb-6 !pt-0">
          <Button onClick={handleClose} className="!text-gray-500 !font-semibold" variant="text">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            className="!bg-[#324286] hover:!bg-[#24316b] !text-white !font-semibold !px-6 !py-1.5 !rounded-lg !shadow-md hover:!shadow-lg transition-all"
          >
            Book Now
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BookConsultantModal;
