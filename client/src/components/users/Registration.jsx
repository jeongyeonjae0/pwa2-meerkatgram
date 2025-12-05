import { useNavigate } from 'react-router-dom';
import './Registration.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { userProfileUploadThunk, userStoreThunk } from '../../store/thunks/userStoreThunk.js';

export default function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordChk, setPasswordChk] = useState('');
  const [nick, setNick] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  // 파일 변경시 처리 함수
  function changeFiles(e) {
    // 선택 파일 정보 획득(1개의 파일만 올리는걸 전제)
    const file = e.target.files[0];

    // 미리보기
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', () => { setPreview(fileReader.result) });

    setFile(file);
  }

  // 회원 가입 처리
  async function handleStore(e) {
    e.preventDefault();

    try {
      // 파일 업로드 처리
      const resultUpload = await dispatch(userProfileUploadThunk(file)).unwrap();
      const profile = resultUpload.data.path; // 파일 업로드 URL 획득

      // 게시글 작성
      await dispatch(userStoreThunk({ email, password, passwordChk, nick, profile})).unwrap();
      
      alert('회원가입에 성공했습니다.\n다시 로그인하여 주십시오.');

      // 작성한 게시글 상세로 이동
      return navigate(`/login`, {replace: true});
    } catch(error) {
      console.log('회원가입', error);
      return alert('회원가입 실패');
    }
  }

  return (
    <>
      <form className="registration-container" onSubmit={handleStore}>
        <input type="text" className='input-big-border' onChange={e => { setEmail(e.target.value) }} placeholder='email' />
        <input type="password" className='input-big-border' onChange={e => { setPassword(e.target.value) }} placeholder='password' />
        <input type="password" className='input-big-border' onChange={e => { setPasswordChk(e.target.value) }} placeholder='password check' />
        <input type="text" className='input-big-border' onChange={e => { setNick(e.target.value) }} placeholder='nick' />
        <input type="file" onChange={changeFiles} accept="image/*" />
        {
          preview && <div className="profile profile-medium" style={{backgroundImage: `url("${preview}")`}}></div>
        }
        <button type="submit" className="btn-big bg-gray">Sign up</button>
      </form>
    </>
  )
}