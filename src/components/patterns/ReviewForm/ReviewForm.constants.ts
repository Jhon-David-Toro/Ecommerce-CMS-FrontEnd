export const INITIAL_REVIEW = { rating: "5", text: "" };

export const RATING_OPTIONS = ["5", "4", "3", "2", "1"].map((value) => ({ value, label: `${value} out of 5` }));

export const THANKS_MESSAGE = "Thanks! Your review will appear once it has been approved.";

export const SAVE_ERROR = "We could not send your review. Please try again.";

export const TEXT_REQUIRED = "Write a few words about the product.";
