import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

export const Breadcrumbs = (props) => {
    const { breadcrumb, current } = props;
    return (
        <div className='breadcrumb'>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={`/${breadcrumb.toLowerCase()}`}>
                        {breadcrumb}
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{current}</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
};
