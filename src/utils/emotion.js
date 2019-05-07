function toEmotion(num) {
    switch (num) {
    case 1:
        return "Low";
    case 2:
        return "Med";
    case 3:
        return "High";
    default:
        return "None";
    }
}

export default toEmotion;
