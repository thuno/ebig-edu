import { OutlineBooks, FilledBooks, OutlineShoppingBag, FilledShoppingBag, OutlineStatics, FilledStatics, OutlineWallet, FilledWallet } from './icon'
import demoAvatar from '../demo-avatar.png';
export const menuList = [
              {
                            id: 2,
                            parentId: 1,
                            name: 'Education Management',
                            link: 'edu-management',
                            icon: <OutlineBooks />,
                            selectedIcon: <FilledBooks />,
              },
              {
                            id: 3,
                            parentId: 1,
                            name: 'Cart Management',
                            link: 'cart-management',
                            icon: <OutlineShoppingBag />,
                            selectedIcon: <FilledShoppingBag />,
              },
              {
                            id: 4,
                            parentId: 1,
                            name: 'Analytics',
                            link: 'analytics',
                            icon: <OutlineStatics />,
                            selectedIcon: <FilledStatics />,
              },
              {
                            id: 5,
                            parentId: 1,
                            name: 'Finance',
                            link: 'fiance',
                            icon: <OutlineWallet />,
                            selectedIcon: <FilledWallet />,
              },
              {
                            id: 6,
                            parentId: 1,
                            name: 'Tài khoản cá nhân',
                            link: 'user',
                            icon: <div style={{ width: '2.4rem', height: '2.4rem', backgroundImage: `url(${demoAvatar})` }}></div>,
                            selectedIcon: <div style={{ width: '2.4rem', height: '2.4rem', backgroundImage: `url(${demoAvatar})` }}></div>,
              },
              {
                            id: 7,
                            parentId: 2,
                            name: 'Dashboard',
                            link: 'edu-management/dashboard',
              },
              {
                            id: 8,
                            parentId: 2,
                            name: 'Teaching Schedule',
                            link: 'edu-management/schedule',
              },
              {
                            id: 9,
                            parentId: 2,
                            name: 'School Management',
                            link: 'edu-management/school',
              },
              {
                            id: 10,
                            parentId: 2,
                            name: 'Student Management',
                            link: 'edu-management/student',
              },
              {
                            id: 11,
                            parentId: 9,
                            listId: [2, 9],
                            name: 'Course',
                            link: 'edu-management/school/course',
              },
              {
                            id: 12,
                            parentId: 9,
                            listId: [2, 9],
                            name: 'Class',
                            link: 'edu-management/school/class',
              },
              {
                            id: 13,
                            parentId: 9,
                            listId: [2, 9],
                            name: 'Mentor',
                            link: 'edu-management/school/mentor',
              },
              {
                            id: 14,
                            parentId: 9,
                            listId: [2, 9],
                            name: 'Curriculum',
                            link: 'edu-management/school/curriculum',
              },
              {
                            id: 15,
                            parentId: 6,
                            name: 'Hồ sơ cá nhân',
                            link: 'user/profile',
              },
              {
                            id: 16,
                            parentId: 6,
                            name: 'Tài khoản liên kết',
                            link: 'user/linked-account',
              },
              {
                            id: 17,
                            parentId: 6,
                            name: 'Mật khẩu và bảo mật',
                            link: 'user/security',
              },
]

export const supportModule = [
              {
                            id: 2,
                            name: 'Help',
                            link: ''
              },
              {
                            id: 3,
                            name: 'Status',
                            link: ''
              },
              {
                            id: 4,
                            name: 'About',
                            link: ''
              },
              {
                            id: 5,
                            name: 'Careers',
                            link: ''
              },
              {
                            id: 6,
                            name: 'Blog',
                            link: ''
              },
              {
                            id: 7,
                            name: 'Privacy',
                            link: ''
              },
              {
                            id: 8,
                            name: 'Terms',
                            link: ''
              },
              {
                            id: 9,
                            name: 'Text to speech',
                            link: ''
              },
              {
                            id: 10,
                            name: 'Teams',
                            link: ''
              },
]