export const formatRelativeDate = (dateString, type) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  // recent dates
  if (type === "separator") {
    switch (diffInDays) {
      case 0:
        return "Today";
      case 1:
        return "Yesterday";
      default:
        if (diffInDays < 7) {
          return date.toLocaleDateString("en-US", { weekday: "long" });
        } else {
          return date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
        }
    }
  } else {
    switch (diffInDays) {
      case 0:
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      case 1:
        return "Yesterday";
      case 2:
        return "2 days ago";
      case 3:
        return "3 days ago";
      case 4:
      case 5:
      case 6:
        return `${diffInDays} days ago`;
      default:
        if (diffInDays < 7) {
          return date.toLocaleDateString("en-US", { weekday: "long" });
        } else if (date.getFullYear() === now.getFullYear()) {
          return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
          });
        } else {
          return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
        }
    }
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
