import React, { useState } from 'react';
import { uploadPdf } from '../services/pdfService';
import { message } from 'antd';
import { Upload, Button, Input, Form, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const PdfUpload: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values: { title: string; file: any }) => {
    try {
      setLoading(true);
      await uploadPdf(values.file.file, values.title);
      message.success('PDF uploaded successfully');
      form.resetFields();
    } catch (error) {
      message.error('Failed to upload PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Upload PDF" style={{ maxWidth: 600, margin: '0 auto' }}>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="Enter PDF title" />
        </Form.Item>

        <Form.Item
          name="file"
          label="PDF File"
          rules={[{ required: true, message: 'Please select a PDF file' }]}
        >
          <Upload
            beforeUpload={(file) => {
              const isPDF = file.type === 'application/pdf';
              if (!isPDF) {
                message.error('You can only upload PDF files!');
              }
              return isPDF || Upload.LIST_IGNORE;
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select PDF</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Upload
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PdfUpload; 