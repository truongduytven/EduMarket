import {
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Button, Dropdown, Menu } from "antd";
import Search from "antd/es/input/Search";
import { useCart } from "../contexts/cartContext";
import { debounce } from "lodash";
import { useSearch } from "../contexts/searchContext";

function Header() {
  const { cart } = useCart();
  const { setSearchTerm } = useSearch();
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Hồ sơ cá nhân
      </Menu.Item>
      <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
        Đơn hàng của tôi
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Cài đặt
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const debouncedSearch = debounce((value: string) => {
    handleSearch(value);
  }, 2000);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          {/* Row 1: Logo + Cart + Profile */}
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-graduation-cap text-white text-lg"></i>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduMarket
              </span>
            </div>

            <div className="w-full md:max-w-2xl md:opacity-100 opacity-0">
              <Search
                placeholder="Tìm kiếm khóa học, giảng viên, chủ đề..."
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                onChange={(e) => debouncedSearch(e.target.value)}
                onSearch={handleSearch}
                className="w-full"
                style={{ borderRadius: "12px" }}
              />
            </div>

            <div className="flex items-center space-x-4">
              <Badge count={cart.length} size="small" offset={[-10, 10]}>
                <Button
                  type="text"
                  icon={<ShoppingCartOutlined />}
                  size="large"
                  className="!rounded-button cursor-pointer"
                />
              </Badge>

              <Dropdown overlay={userMenu} placement="bottomRight">
                <Button
                  type="text"
                  icon={<UserOutlined />}
                  size="large"
                  className="!rounded-button cursor-pointer"
                />
              </Dropdown>
            </div>
          </div>

          <div className="w-full pr-4 md:max-w-2xl md:opacity-0 md:w-0">
            <Search
              placeholder="Tìm kiếm khóa học, giảng viên, chủ đề..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onChange={(e) => debouncedSearch(e.target.value)}
              onSearch={handleSearch}
              className="w-full"
              style={{ borderRadius: "12px" }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
