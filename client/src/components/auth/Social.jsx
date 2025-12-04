import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { reissueThunk } from "../../store/thunks/authThunk.js";

export default function Social() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getAuth() {
      try {
        await dispatch(reissueThunk()); // 토큰 재발급 처리
        navigate('/posts', { replace: true }); // History 남기지 않기
      } catch (error) {
        console.log('Social', error);
        alert('소셜 로그인 실패');
        navigate('/login', { replace: true });
      }
    }
    getAuth();
  }, []);

  return <></>
}