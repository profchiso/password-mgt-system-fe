import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull, l } from "tsparticles";
import { loadSlim } from "@tsparticles/slim";
import {
  ConfigProvider,
  Button,
  Input,
  Radio,
  Space,
  notification,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { generateStrongPassword } from "./passwordGeneration";

import "./App.css";

function App() {
  const [init, setInit] = useState(false);
  const [password, setPassword] = useState("");
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      //   background: {
      //     color: {
      //       value: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"],
      //     },
      //   },
      //   fpsLimit: 120,
      //   interactivity: {
      //     events: {
      //       onClick: {
      //         enable: true,
      //         mode: "push",
      //       },
      //       onHover: {
      //         enable: true,
      //         mode: "repulse",
      //       },
      //     },
      //     modes: {
      //       push: {
      //         quantity: 4,
      //       },
      //       repulse: {
      //         distance: 200,
      //         duration: 0.4,
      //       },
      //     },
      //   },
      //   particles: {
      //     color: {
      //       value: "#46edbe",
      //     },
      //     links: {
      //       color: "#ffffff",
      //       distance: 150,
      //       enable: true,
      //       opacity: 0.5,
      //       width: 1,
      //     },
      //     move: {
      //       direction: "none",
      //       enable: true,
      //       outModes: {
      //         default: "bounce",
      //       },
      //       random: false,
      //       speed: 4,
      //       straight: false,
      //     },
      //     number: {
      //       density: {
      //         enable: true,
      //       },
      //       value: 80,
      //     },
      //     opacity: {
      //       value: 0.5,
      //     },
      //     shape: {
      //       type: "square",
      //     },
      //     size: {
      //       value: { min: 1, max: 5 },
      //     },
      //   },
      //   detectRetina: true,

      particles: {
        color: {
          value: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"],
        },
        move: {
          enable: true,
          outModes: "out",
          speed: { min: 1, max: 3 },
          path: {
            enable: true,
            options: {
              waveLength: { min: 3, max: 7 },
              waveHeight: { min: 1, max: 5 },
            },
            generator: "zigZagPathGenerator",
          },
          trail: {
            enable: true,
            length: 20,
            fill: {
              color: "#000000",
            },
          },
        },
        number: {
          value: 80,
        },
        opacity: {
          value: 1,
        },
        shape: {
          type: "square",
        },
        size: {
          value: 3,
        },
      },
      background: {
        color: "#000000",
      },
    }),

    []
  );

  // const openNotificationWithIcon = (type, description) => {
  //   api[type]({
  //     message: "Success",
  //     description,
  //   });
  // };

  const onCopy = () => {
    navigator.clipboard.writeText(password).then(
      function () {
        notification.open({
          message: "Copy",
          type: "info",
          description: "Password copied successfully",
        });
      },
      function (err) {
        notification.open({
          message: "Copy",
          type: "error",
          description: "Error coping password",
        });
        console.error(": ", err);
      }
    );
  };
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#d3ab24" } }}>
      <div className="App">
        <div className="particles-container">
          <Particles id="tsparticles" options={options} />
          <div className="content">
            <header className="App-header">
              <h2>Secured Password Management System</h2>
              <main className="main-content">Choose password option</main>
              <div className="element-container" style={{ color: "#fff" }}>
                <Radio.Group onChange={onChange} value={value} defaultValue={1}>
                  <Space direction="vertical">
                    <Radio className="first" value={1}>
                      Enter Password
                    </Radio>
                    <Radio value={2}>Generate Password</Radio>
                  </Space>
                </Radio.Group>
              </div>
              {value === 1 && (
                <div className="element-container">
                  <Space direction="horizontal">
                    <Input.Password
                      placeholder="input password"
                      onChange={(e) => setPassword(e.target.value)}
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Space>
                </div>
              )}
              {value === 2 && (
                <div className="element-container">
                  <Space direction="horizontal">
                    <div>{password}</div>
                    <Button
                      type="primary"
                      onClick={() => setPassword(generateStrongPassword(9))}
                    >
                      {password === ""
                        ? "Generate Password"
                        : "Regenerate Password"}
                    </Button>
                    {password !== "" && (
                      <Button type="dashed" onClick={onCopy}>
                        Copy
                      </Button>
                    )}
                  </Space>
                </div>
              )}
              <div className="element-container">
                <Button type="primary">Submit</Button>
              </div>
            </header>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
