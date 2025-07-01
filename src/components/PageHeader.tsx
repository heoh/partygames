import { FaEllipsisV } from 'react-icons/fa';

export type MenuItem = {
  text: string;
  className?: string;
  onClick?: () => void;
};

export type Menu = MenuItem[];

type PageHeaderProps = {
  title?: string;
  menu?: Menu;
};

export default function PageHeader({ title, menu }: PageHeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="navbar px-4">
        <div className="flex-1 text-xl font-bold">{title}</div>
        <div className="flex-none">
          {menu &&
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-circle">
                <FaEllipsisV className="w-5 h-5" />
              </button>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                {menu.map((item, index) => (
                  <li key={index}><a className={item.className} onClick={item.onClick}>{item.text}</a></li>
                ))}
              </ul>
            </div>
          }
        </div>
      </div>
    </header>
  );
}
