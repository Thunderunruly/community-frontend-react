import { Badge, Dropdown, theme, Avatar as UserIcon } from "antd";
import PropTypes from 'prop-types';
import { useIntl } from "react-intl";

const Avatar = ({
    username = "", 
    avatarUrl = "", 
    shape = "circle", 
    size, 
    count = 0, 
    dot = false, 
    badgeSize, 
    autoFocus, 
    arrow, 
    disabled, 
    destroyPopupOnHide = false, 
    items, 
    style,
    selectedKeys,
    onClick = () => {}, 
    placement = "bottomLeft", 
    trigger = ["hover"]}) => {
  const { token } = theme.useToken();
  const intl = useIntl();
  return (<Dropdown
      arrow={arrow}
      autoFocus={autoFocus}
      disabled={disabled}
      destroyPopupOnHide={destroyPopupOnHide}
      menu={{items, onClick, selectedKeys}}
      trigger={trigger}
      placement={placement}
    >
    <Badge
      count={count}
      size={badgeSize}
      dot={dot}
      title={intl.formatMessage({id: "notification.unread"}, {count})}
    >
      <UserIcon
        src={avatarUrl}
        alt={username}
        shape={shape}
        size={size}
        draggable={false}
        style={{background: token.colorPrimaryTextHover, border: `1px solid ${token.colorPrimaryBorder}`, color: token.colorBgBase, ...style}}>
        {username}
      </UserIcon>
    </Badge>
  </Dropdown>);
};

Avatar.propTypes = {
  username: PropTypes.string,
  avatarUrl: PropTypes.string,
  shape: PropTypes.oneOf(['circle', 'square']),
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['large', 'small', 'default']),
    PropTypes.shape({
      xs: PropTypes.number,
      sm: PropTypes.number,
      md: PropTypes.number,
      lg: PropTypes.number,
      xl: PropTypes.number,
      xxl: PropTypes.number
    })
  ]),
  dot: PropTypes.bool,
  badgeSize: PropTypes.oneOf(['small', 'default']),
  autoFocus: PropTypes.bool,
  arrow: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      pointAtCenter: PropTypes.bool
    })
  ]),
  disabled: PropTypes.bool,
  destroyPopupOnHide: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.node,
    label: PropTypes.node,
    type: PropTypes.string,
    danger: PropTypes.bool,
    title: PropTypes.node
  })),
  placement: PropTypes.oneOf(["bottom", "bottomLeft", "bottomRight", "top", "topLeft", "topRight"]),
  trigger: PropTypes.arrayOf(PropTypes.oneOf(["click", "hover", "contextMenu"])),
  onClick: PropTypes.func,
  selectedKeys: PropTypes.arrayOf(PropTypes.string)
};

export default Avatar;