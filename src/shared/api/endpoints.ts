import { DateMask } from 'shared/types'

export const endpoints = {
  login: '/login', // POST
  send_sms_code: '/send-sms-code', // POST

  family: {
    get: '/family',
    types: '/family/types',
    post: '/family', // POST
    put: (person_id: number) => `/family/${person_id}`, // PUT
    delete: (person_id: number) => `/family/${person_id}`, // DELETE
    deleteFromFamily: (person_id: number) =>
      `/family/${person_id}/member`, // PUT
  },

  profile: {
    get: '/profile',
    update: '/profile/update', // POST
  },

  doctor: {
    get: '/doctor',
    getByClinicId: (clinic_id: number) =>
      `/doctor/?clinic_id=${clinic_id}`,
    getBySpecialtyId: (specialty_id: number) =>
      `/doctor/?specialty_id=${specialty_id}`,
    getByDate: (date: DateMask) => `/doctor/?date=${date}`,
    getBySpecialtyIdDate: (specialty_id: number, date: DateMask) =>
      `/doctor/?specialty_id=${specialty_id}&date=${date}`,
    getById: (doctor_id: number) => `/doctor/${doctor_id}`,
    getByIdDate: (doctor_id: number, date: DateMask | null) =>
      `/doctor/${doctor_id}${date ? `?date=${date}` : ''}`,
  },

  story: {
    get: '/story',
    getById: (story_id: number) => `/story/${story_id}`,
  },

  stock: {
    get: '/stock',
    getById: (stock_id: number) => `/stock/${stock_id}`,
  },

  order: {
    get: '/order',

    getDoctors: '/order/doctors',
    postDoctors: `/order/doctors`, // POST

    getAnalysis: '/order/analyses',
    postAnalysis: `/order/analyses`, // POST

    getHome: '/order/home',
    postHome: `/order/home`, // POST
    update: (order_id: number) => `/order/${order_id}`, // PUT
    delete: (order_id: number) => `/order/${order_id}`, // DELETE
  },

  analysis: {
    get: '/analysis',
    getById: (analysis_id: number) => `/analysis/${analysis_id}`,

    getCategory: '/analysis-category',
    getCategoryById: (category_id: number) =>
      `/analysis-category/${category_id}`,
  },

  payments: {
    payment: '/payment',
    getById: (payment_id: number) => `/payment/${payment_id}`,
  },

  clinics: {
    get: '/clinic',
    getById: (clinic_id: number) => `/clinic/${clinic_id}`,
  },

  notifications: {
    get: `/notification`,
    getById: (notification_id: number) =>
      `/notification/${notification_id}`,
    setToken: '/notification/device-token', // POST
  },

  faq: {
    get: '/faq',
    getById: (faq_id: number) => `/faq/${faq_id}`,
  },

  specialties: {
    get: '/specialty',
    getById: (specialty_id: number) => `/specialty/${specialty_id}`,
  },

  homeServices: {
    get: '/home-service',
    getById: (service_id: number) => `/home-service/${service_id}`,
  },

  application: {
    get: `/application`,
    post: '/application', // POST
  },
}
