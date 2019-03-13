export default {
  menus: [
    {
      id: '0',
      name: '系统管理',
      icon: 'md-settings',
      url: '/system',
      permission: 'system.menu',
      children: [
        {
          id: '01',
          name: '用户管理',
          icon: 'md-person',
          url: '/system/user',
          permission: 'system.user.menu'
        },
        {
          id: '02',
          name: '部门管理',
          icon: 'md-contacts',
          url: '/system/department',
          permission: 'system.department.menu'
        },
        {
          id: '03',
          name: '菜单管理',
          icon: 'md-menu',
          url: '/system/menu',
          permission: 'system.menu.menu'
        },
        {
          id: '04',
          name: '权限管理',
          icon: 'md-lock',
          url: '/system/permission',
          permission: 'system.permission.menu'
        }
      ]
    },
    {
      id: '1',
      name: '单级菜单',
      icon: 'md-albums',
      url: '/one',
      permission: 'one.menu',
    },
    {
      id: '2',
      name: '多级菜单',
      icon: 'md-aperture',
      url: '/multiLevel',
      permission: 'multiLevel.menu',
      children: [
        {
          id: '21',
          name: '子菜单一',
          icon: 'logo-apple',
          url: '/multiLevel/one',
          permission: 'multiLevel.one.menu',
          children: [
            {
              id: '211',
              name: '子子菜单一',
              icon: 'logo-apple',
              url: '/multiLevel/one/one',
              permission: 'multiLevel.one.menu',
            },
            {
              id: '212',
              name: '子子菜单二',
              icon: 'logo-apple',
              url: '/multiLevel/one/tow',
              permission: 'multiLevel.one.menu',
            }
          ]
        },
        {
          id: '22',
          name: '子菜单二',
          icon: 'md-appstore',
          url: '/multiLevel/two',
          permission: 'multiLevel.two.menu'
        },
        {
          id: '23',
          name: '子菜单三',
          icon: 'ios-appstore',
          url: '/multiLevel/three',
          permission: 'multiLevel.three.menu'
        },
        {
          id: '24',
          name: '子菜单四',
          icon: 'ios-analytics',
          url: '/multiLevel/four',
          permission: 'multiLevel.four.menu'
        },
        {
          id: '25',
          name: '子菜单五',
          icon: 'md-baseball',
          url: '/multiLevel/five',
          permission: 'multiLevel.five.menu',
          children: [
            {
              id: '251',
              name: '子子菜单一',
              icon: 'logo-apple',
              url: '/multiLevel/five/one',
              permission: 'multiLevel.five.menu',
            },
            {
              id: '252',
              name: '子子菜单二',
              icon: 'logo-apple',
              url: '/multiLevel/five/tow',
              permission: 'multiLevel.five.menu',
            },
            {
              id: '253',
              name: '子子菜单三',
              icon: 'logo-apple',
              url: '/multiLevel/five/three',
              permission: 'multiLevel.five.menu',
            }
          ]
        },
        {
          id: '26',
          name: '子菜单六',
          icon: 'ios-basket',
          url: '/multiLevel/six',
          permission: 'multiLevel.six.menu'
        },
        {
          id: '27',
          name: '子菜单七',
          icon: 'md-beaker',
          url: '/multiLevel/seven',
          permission: 'multiLevel.seven.menu'
        },
        {
          id: '28',
          name: '子菜单八',
          icon: 'md-bicycle',
          url: '/multiLevel/eight',
          permission: 'multiLevel.eight.menu'
        },
      ]
    },
    {
      id: '3',
      name: '组件',
      icon: 'ios-calendar',
      url: '/component',
      permission: 'component.menu',
      children: [
        {
          id: '31',
          name: '富文本',
          icon: 'md-bookmarks',
          url: '/component/editor',
          permission: 'component.editor.menu'
        },
        {
          id: '32',
          name: '拖拽',
          icon: 'md-bookmarks',
          url: '/component/dragDrop',
          permission: 'component.dragDrop.menu'
        },
        {
          id: '33',
          name: '导入导出',
          icon: 'md-bookmarks',
          url: '/component/excel',
          permission: 'component.excel.menu'
        }
      ]
    },
  ],

  permissions: [
    'system.menu',
    'system.user.menu',
    'system.department.menu',
    'system.menu.menu',
    'system.permission.menu',
    'one.menu',
    'multiLevel.menu',
    'multiLevel.one.menu',
    'multiLevel.two.menu',
    'multiLevel.three.menu',
    'multiLevel.four.menu',
    'multiLevel.five.menu',
    'multiLevel.six.menu',
    'multiLevel.seven.menu',
    'multiLevel.eight.menu',
    'component.menu',
    'component.editor.menu',
    'component.dragDrop.menu',
    'component.excel.menu'
  ]
}
