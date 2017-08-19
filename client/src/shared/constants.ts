enum Platform {
    Facebook = 'facebook',
    Google = 'google',
}

enum FontWeight {
    Light = 300,
    Regular = 400,
    SemiBold = 600,
    Bold = 700,
}

enum FontSize {
    XLarge = 40,
}

export const Constants = {
    TRANSITION_SECONDS: 0.35,
    DISABLED_OPACITY: 0.7,
    HOVER_OPACITY: 0.8,
    PADDING: 10,
    Platform,
    LoginButtonDimensions: {
        WIDTH: 300,
        HEIGHT: 60,
    },
    FontSize,
    FontWeight,
    BoxShadow: {
        NORMAL: 'rgba(0, 0, 0, 0.1) 0px 1px 15px, rgba(0, 0, 0, 0.2) 0px 1px 2px',
    },
};
