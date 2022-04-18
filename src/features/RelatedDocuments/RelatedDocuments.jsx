import { DownloadOutlined, ExpandOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, List, Row, Typography } from "antd";
import BadgeRibbonUrgency from "components/BadgeRibbonUrgent";
import ButtonFlexible from "components/ButtonTooltip";
import { saveAs } from "file-saver";
import { mockRelatedDocument } from "mocks/relatedDocument";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const WrapCard = styled(Card)`
  background-color: rgba(248, 250, 252, 1);
`;

const CardItemAnt = styled(Card)`
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
`;

export default function RelatedDocuments() {
  const handlePreviewFileClick = (item) => {
    window.open(item, {
      target: "_blank",
      rel: "noopener noreferrer",
    });
  };
  const handleSaveFileClick = (item) => {
    saveAs(item, "name_cua_file.pdf");
  };

  return (
    <WrapCard bordered={false}>
      <List
        itemLayout="vertical"
        size="default"
        pagination={{
          pageSize: 10,
          defaultCurrent: 1,
          hideOnSinglePage: true,
          onChange: (page) => {
            console.log(page);
          },
        }}
        dataSource={mockRelatedDocument}
        renderItem={(item) => (
          <List.Item>
            <BadgeRibbonUrgency text={item.urgentLevel} key={item.key}>
              <CardItemAnt bordered={false}>
                <Row align="middle" justify="space-between">
                  <Col span={24}>
                    <List.Item.Meta
                      avatar={<Avatar size="large">{item.avatar.charAt(0).toUpperCase()}</Avatar>}
                      title={<Link to={`/detail/${item.key}`}>{item.title}</Link>}
                    />
                  </Col>
                  <Col span={7}>
                    <Typography.Title level={5}>
                      Số hiệu văn bản:
                      <Typography.Text keyboard>{item.documentNumber}</Typography.Text>
                    </Typography.Title>
                  </Col>
                  <Col span={7}>
                    <Typography.Title level={5}>
                      Người ký: <Typography.Text keyboard>{item.signer}</Typography.Text>
                    </Typography.Title>
                  </Col>
                  <Col span={7}>
                    <Typography.Title level={5}>
                      Ngày Ban hành: <Typography.Text keyboard>{item.dateIssued}</Typography.Text>
                    </Typography.Title>
                  </Col>
                  <Col span={1}>
                    <Typography.Title level={5}>
                      <ButtonFlexible
                        type="primary"
                        shape="round"
                        icon={<ExpandOutlined />}
                        onButtonClick={handlePreviewFileClick}
                        document={item.fileUrl}
                      />
                    </Typography.Title>
                  </Col>
                  <Col span={1}>
                    <Typography.Title level={5}>
                      <ButtonFlexible
                        type="primary"
                        shape="round"
                        icon={<DownloadOutlined />}
                        onButtonClick={handleSaveFileClick}
                        document={item.fileUrl}
                      />
                    </Typography.Title>
                  </Col>
                </Row>
              </CardItemAnt>
            </BadgeRibbonUrgency>
          </List.Item>
        )}
      />
    </WrapCard>
  );
}
