import { Card, Col, Row, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const RowAnt = styled(Row)`
  margin-bottom: 16px;
`;
const CardAnt = styled(Card)`
  border-radius: 15px;
`;
const IconBox = styled.div`
  width: 48px;
  height: 48px;
  text-align: center;
  background: #1890ff;
  color: #fff;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WrapTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function Analytics({ dataRender }) {
  return (
    <RowAnt gutter={[15, 0]}>
      {dataRender.map((item) => (
        <Col span={dataRender.length > 3 ? 6 : 8} key={item.key}>
          <CardAnt>
            <Row>
              <Col span={24}>
                <WrapTitle>
                  <div>
                    <Typography.Text type="secondary">
                      <Typography.Title level={4}>{item.title}</Typography.Title>
                    </Typography.Text>
                    <Typography.Title level={5}>
                      <Typography.Text type="secondary">{item.value}</Typography.Text>
                    </Typography.Title>
                  </div>
                  <IconBox>{item.icon}</IconBox>
                </WrapTitle>
              </Col>
            </Row>
          </CardAnt>
        </Col>
      ))}
    </RowAnt>
  );
}
