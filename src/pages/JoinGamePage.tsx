import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/hooks/useAuth";
import { closeActiveDropdown } from "@/shared/util";
import { useNavigate } from "react-router";

export default function JoinGamePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/');
  };
  const handleSignOut = () => {
    closeActiveDropdown();
    signOut();
  };

  return (
    <div>
      <PageHeader
        menu={[
          { text: '입장 취소', onClick: handleGoBack },
          ...(user ? [{ text: '로그아웃', onClick: handleSignOut }] : []),
        ]}
      />
      <div className="hero bg-base-200 min-h-svh">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">플레이어 설정</h1>
            <p className="py-6">
              <input type="text" placeholder="플레이어 이름" className="input input-lg text-center" />
            </p>
            <button className="btn btn-primary">준비하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
