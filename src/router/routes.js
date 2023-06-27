const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  // },
  {
    path: '/',
    name: 'root',
    component: () => import('layouts/LandingLayout.vue'),
    children: [{ path: '', component: () => import('pages/LandingPage.vue') }],
  },
  {
    path: '/search',
    name: 'root-search',
    component: () => import('layouts/SearchResultsLayout.vue'),
    children: [
      { path: '', component: () => import('pages/search/ResultsPage.vue') },
    ],
  },
  {
    path: '/book',
    children: [
      {
        path: ':id',
        component: () => import('layouts/CenterDialogLayout.vue'),
        children: [
          {
            path: '',
            name: 'book-start',
            component: () => import('pages/book/BookingPage.vue'),
          },
          {
            path: 'confirm',
            name: 'book-confirm',
            component: () => import('pages/book/ConfirmationPage.vue'),
          },
          {
            path: 'success',
            name: 'book-success',
            component: () => import('pages/book/SuccessPage.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/home',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/home/HomePage.vue') },
    ],
  },
  {
    path: '/test',
    component: () => import('pages/test/ApolloTestPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
