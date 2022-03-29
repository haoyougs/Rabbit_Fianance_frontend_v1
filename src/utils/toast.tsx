import { Tocast } from "components/tocast";
import ReactDOM from "react-dom";
function TocastBody(props: {
  bgColor: string;
  title?: string;
  content: string;
  interVal: number;
}) {
  const div = document.createElement("div");
  document.body.appendChild(div);
  const handleClose = () => {
    if (div) {
      document.body.removeChild(div);
    }
  };
  const Toast = <Tocast {...props} onClose={handleClose} />;
  ReactDOM.render(Toast, div);
}
const INTERVAL = 3500;
export const Toast = {
  error(content: string, title?: string) {
    TocastBody({ content, title, bgColor: "#f44336", interVal: INTERVAL });
  },
  success(content: string, title?: string) {
    TocastBody({ content, title, bgColor: "#37ae3d", interVal: INTERVAL });
  },
  warning(content: string, title?: string) {
    TocastBody({ content, title, bgColor: "#efb90b", interVal: INTERVAL });
  },
  operationSuccess() {
    TocastBody({
      content: "Operation successed",
      title: "",
      bgColor: "#37ae3d",
      interVal: INTERVAL,
    });
  },
  operationFailed() {
    TocastBody({
      content: "Operation Failed",
      title: "",
      bgColor: "#f44336",
      interVal: INTERVAL,
    });
  },
};
