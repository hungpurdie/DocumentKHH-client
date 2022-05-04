import { InfoCircleOutlined } from "@ant-design/icons";
import { Col, Form, Row, TreeSelect, Typography } from "antd";
import {
  getAgenciesConfig,
  getCategoriesConfig,
  getTypesOfDocumentsConfig,
} from "app/selectors/config";
import SelectForm from "components/SelectForm";
import TreeSelectForm from "components/TreeSelectForm";
import { useSelector } from "react-redux";
import styled from "styled-components";

const FormItemAnt = styled(Form.Item)`
  padding-left: 20px;
`;

export default function DocumentClassification(props) {
  const {
    typesOfDocument,
    onTypesOfDocumentSelect,
    categoryOfDocument,
    onCategoryOfDocumentSelect,
    onCategoryOfDocumentDeSelect,
    agencyIssueDocument,
    onAgencyIssueDocumentSelect,
    required,
  } = props;
  const agenciesConfig = useSelector(getAgenciesConfig);
  const categoriesConfig = useSelector(getCategoriesConfig);
  const typesOfDocumentsConfig = useSelector(getTypesOfDocumentsConfig);

  return (
    <Row>
      <Col span={7}>
        <FormItemAnt
          label={<Typography.Text strong>Loại văn bản</Typography.Text>}
          name="typesOfDocument"
          rules={[{ required: required, message: "Trường này là bắt buộc" }]}
          tooltip={{
            title: "Loại văn bản của bạn?",
            icon: <InfoCircleOutlined />,
          }}
          initialValue={typesOfDocument}
        >
          <SelectForm
            selectData={typesOfDocumentsConfig}
            onSelect={onTypesOfDocumentSelect}
            showSearch={true}
            placeholder="Chọn loại văn bản"
            size="large"
            allowClear
            filterOption={false}
            notFoundContent={required}
          />
        </FormItemAnt>
      </Col>
      <Col span={10}>
        <FormItemAnt
          label={<Typography.Text strong>Chuyên mục</Typography.Text>}
          name="category"
          rules={[{ required: required, message: "Trường này là bắt buộc" }]}
          tooltip={{
            title: "Chuyên mục văn bản của bạn?",
            icon: <InfoCircleOutlined />,
          }}
          initialValue={categoryOfDocument}
        >
          <TreeSelectForm
            treeData={categoriesConfig}
            onSelect={onCategoryOfDocumentSelect}
            onDeselect={onCategoryOfDocumentDeSelect}
            placeholder="Chọn chuyên mục"
            allowClear
            size="large"
            showCheckedStrategy={TreeSelect.SHOW_PARENT}
          />
        </FormItemAnt>
      </Col>
      <Col span={7}>
        <FormItemAnt
          label={<Typography.Text strong>Cơ quan ban hành</Typography.Text>}
          name="agency"
          rules={[{ required: required, message: "Trường này là bắt buộc" }]}
          tooltip={{
            title: "Cơ quan ban hành văn bản của bạn?",
            icon: <InfoCircleOutlined />,
          }}
          initialValue={agencyIssueDocument}
        >
          <SelectForm
            selectData={agenciesConfig}
            onSelect={onAgencyIssueDocumentSelect}
            showSearch={true}
            placeholder="Chọn cơ quan ban hành"
            size="large"
            filterOption={false}
            notFoundContent={required}
            allowClear
          />
        </FormItemAnt>
      </Col>
    </Row>
  );
}
