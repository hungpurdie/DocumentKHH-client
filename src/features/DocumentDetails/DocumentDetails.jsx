import { ExclamationCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Form, Modal, Row, Space, Tabs, TreeSelect } from "antd";
import { getRole, isAuthenticated } from "app/selectors/auth";
import { getFiles, getParticipants, getProperty } from "app/selectors/documentDetails";
import { getRelatedDocuments } from "app/selectors/documents";
import DocumentSummary from "components/DocumentSummary";
import ForwardIcon from "components/Icons/ForwardIcon";
import ModalForm from "components/ModalForm";
import TreeSelectForm from "components/TreeSelectForm";
import { ROLES } from "configs/roles";
import { treePeople } from "configs/trees";
import ChartReceiver from "features/ChartReceiver/ChartReceiver";
import ChatRoom from "features/ChatRoom/ChatRoom";
import { fetchDocumentDetails } from "features/DocumentDetails/documentDetailsSlice";
import FileList from "features/FileList/FileList";
import RelatedDocuments from "features/RelatedDocuments/RelatedDocuments";
import TreeProcessing from "features/TreeProcessing/TreeProcessing";
import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const ButtonAnt = styled(Button)`
  display: flex;
`;

export default function DetailDocument() {
  const [visible, setVisible] = React.useState(false);
  const [document, setDocument] = React.useState();

  const [treeReceiver, setTreeReceiver] = React.useState();

  const dispatch = useDispatch();
  const { slug } = useParams();

  const role = useSelector(getRole);
  const isAuth = useSelector(isAuthenticated);
  const property = useSelector(getProperty);
  const files = useSelector(getFiles);
  const relatedDocuments = useSelector(getRelatedDocuments);
  const participants = useSelector(getParticipants);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab");

  React.useEffect(() => {
    dispatch(fetchDocumentDetails({ slug, key: activeTab }));
  }, [isAuth, slug, dispatch, activeTab]);

  const handleTabChangeClick = (key) => {
    navigate(`?tab=${key}`);
    dispatch(fetchDocumentDetails({ slug, key }));
  };

  const handleTreeReceiverSelect = (value) => {
    setTreeReceiver([...treeReceiver, value]);
  };

  const handleForwardClick = (forwardId) => {
    setVisible(true);
  };

  const handleFinishProcessed = () => {
    Modal.confirm({
      title: "Lưu ý",
      icon: <ExclamationCircleOutlined />,
      content: "Thông báo đã cho mọi người bạn đã xử lý xong?",
      okText: "Hoàn thành",
      cancelText: "Hủy",
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  };

  const handleOnSubmit = (values) => {
    setVisible(false);
  };
  const handleOnCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <ModalForm
        visible={visible}
        onSubmit={handleOnSubmit}
        onCancel={handleOnCancel}
        size="large"
        title={"Chuyển tiếp văn bản"}
        okText={"Chuyển tiếp"}
        cancelText={"Hủy"}
        layout="vertical"
        name="forward"
        width={1000}
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 22, offset: 1 },
          md: { span: 20, offset: 2 },
        }}
      >
        <Form.Item
          key={slug}
          name="to"
          label="Người nhận"
          tooltip={{ title: "Người nhận văn bản của bạn?", icon: <InfoCircleOutlined /> }}
          rules={[{ required: true, message: "Trường này là bắt buộc" }]}
        >
          <TreeSelectForm
            treeData={treePeople}
            onTreeSelect={handleTreeReceiverSelect}
            placeholder="Chọn người nhận"
            allowClear
            size="large"
            showCheckedStrategy={TreeSelect.SHOW_PARENT}
            treeCheckable={true}
          />
        </Form.Item>
      </ModalForm>

      <Card
        title="Nội dung văn bản"
        extra={
          (role === ROLES.ADMIN || role === ROLES.USER) &&
          document?.isProtect && (
            <Space split={<Divider type="vertical" />}>
              <Button
                type="primary"
                onClick={() => handleFinishProcessed(document.key)}
                size="large"
              >
                Báo cáo đã xứ lý
              </Button>
              <ButtonAnt
                type="primary"
                icon={<ForwardIcon />}
                size="large"
                onClick={() => handleForwardClick(document.key)}
              >
                Chuyển tiếp
              </ButtonAnt>
            </Space>
          )
        }
      >
        <Row>
          <Col flex="auto">
            <Tabs activeKey={activeTab} type="card" size="large" onTabClick={handleTabChangeClick}>
              <Tabs.TabPane tab="Thuộc tính" key="property">
                {!_.isEmpty(property) && <DocumentSummary dataSource={property} />}
              </Tabs.TabPane>
              <Tabs.TabPane tab="Danh sách văn bản" key="files">
                <FileList files={files} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Văn bản liên quan" key="relatedDocuments">
                <RelatedDocuments dataSource={relatedDocuments} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Cây xử lý" key="participants">
                {!_.isEmpty(participants) && <TreeProcessing treeData={participants} />}
              </Tabs.TabPane>
              <Tabs.TabPane tab="Phân tích" key="analytics">
                <ChartReceiver />
              </Tabs.TabPane>
              {(role === ROLES.ADMIN || role === ROLES.USER) && !property.isPublic && (
                <>
                  <Tabs.TabPane tab="Phản hồi" key="feedback">
                    <ChatRoom />
                  </Tabs.TabPane>
                </>
              )}
            </Tabs>
          </Col>
        </Row>
      </Card>
    </>
  );
}
