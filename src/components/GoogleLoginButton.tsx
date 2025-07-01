import { FcGoogle } from 'react-icons/fc';

type GoogleLoginButtonProps = {
  onClick: () => void;
};

export default function GoogleLoginButton({ onClick }: GoogleLoginButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md shadow-sm transition-colors cursor-pointer"
    >
      <FcGoogle className="text-xl" />
      <span>Google 계정으로 로그인</span>
    </button>
  );
}
