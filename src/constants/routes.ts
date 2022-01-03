export default {
  ADMIN: {
    __PATH: "admin",
    ROUTE: "/admin",
    BROKER: {
      __PATH: "broker/homepage",
      ROUTE: "/admin/broker/homepage",
    },
    BROKER_PROFILE: {
      __PATH: "broker/profile/:id",
      ROUTE: "/admin/broker/profile",
    },
    DRIVER: {
      __PATH: "driver/homepage",
      ROUTE: "/admin/driver/homepage",
    },
    CREATE_DRIVER: {
      __PATH: "driver/create",
      ROUTE: "/admin/driver/create",
    },
    COMBINATION_USER: {
      __PATH: "combination-user/homepage",
      ROUTE: "/admin/combination-user/homepage",
    },
    COMPANY: {
      __PATH: "company/homepage",
      ROUTE: "/admin/company/homepage",
    },
    NEWS: {
      __PATH: "news/homepage",
      ROUTE: "/admin/news/homepage",
    },
    CREATE_NEWS: {
      __PATH: "news/create",
      ROUTE: "/admin/news/create",
    },
    NOTIFICATION: {
      __PATH: "notification/homepage",
      ROUTE: "/admin/notification/homepage",
    },
    CREATE_NOTIFICATION: {
      __PATH: "notification/create",
      ROUTE: "/admin/notification/create",
    },
    MESSAGE: {
      __PATH: "message/homepage",
      ROUTE: "/admin/message/homepage",
    },
    CREATE_MESSAGE: {
      __PATH: "message/create",
      ROUTE: "/admin/message/create",
    },
    PROMO_CODE: {
      __PATH: "promo-code/homepage",
      ROUTE: "/admin/promo-code/homepage",
    },
    CREATE_PROMO_CODE: {
      __PATH: "promo-code/create",
      ROUTE: "/admin/promo-code/create",
    },
    REFERAL: {
      __PATH: "referal/homepage",
      ROUTE: "/admin/referal/homepage",
    },
    IN_GAME_REWARD: {
      __PATH: "in-game-reward/homepage",
      ROUTE: "/admin/in-game-reward/homepage",
    },
    SETTINGS: {
      __PATH: "setting/create",
      ROUTE: "/admin/setting/create",
    }
  },

  SURVEY: {
    __PATH: "survey",
    ROUTE: "/survey",
    HOMEPAGE: {
      ROUTE: "/survey/homepage",
      __PATH: "homepage",
    },
    CREATE_SURVEY: {
      ROUTE: "/survey/create-survey",
      __PATH: "create-survey",
    },
    CREATE_SURVE_CONTENTS: {
      ROUTE: "/survey/create-survey-contents",
      __PATH: "create-survey-contents",
    },
    SINGLE_SURVEY: {
      ROUTE: "/survey/single-survey",
      __PATH: "single-survey",
    },
    SINGLE_SURVEY_CONTENTS: {
      ROUTE: "/survey/single-survey-contents",
      __PATH: "single-survey-contents",
    },
    FILL_SURVEY: {
      ROUTE: "/survey/fill-survey",
      __PATH: "fill-survey/:id",
    },
  },
  STATUS: {
    THANK_YOU_PAGE: {
      ROUTE: "/status/thank-you",
      __PATH: "thank-you",
    }
  }
}