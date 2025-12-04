import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Login from '../components/auth/Login.jsx';
import PostIndex from '../components/posts/PostIndex.jsx';
import PostCreate from '../components/posts/PostCreate.jsx';
import PostShow from '../components/posts/PostShow.jsx';
import Registration from '../components/users/Registration.jsx';
import UserInfo from "../components/users/UserInfo.jsx";
import Social from "../components/auth/Social.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        loader: async () => {
          // `loader`에 정의한 처리는 라우트 진입 시 실행 됨
          // `redirect()`를 이용해서 해당 라우터로 이동
          return redirect('/posts');
        }
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/posts',
        element: <PostIndex />
      },
      {
        path: '/posts/create',
        element: <PostCreate />
      },
      {
        path: '/posts/show/:id',
        element: <PostShow />
      },
      {
        path: '/registration',
        element: <Registration />
      },
      {
        path: '/users/:id',
        element: <UserInfo />
      },
    ]
  },
  {
    path: '/callback/social',
    element: <Social />
  }
]);

export default function Router() {
  return <RouterProvider router={router} />
}