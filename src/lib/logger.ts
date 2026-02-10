export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogPayload {
  event: string;
  [key: string]: any;
}

// 모니터링 알림 전송 (비동기/비차단)
async function sendNotification(level: LogLevel, payload: LogPayload) {
  const webhookUrl = process.env.MONITORING_WEBHOOK_URL;
  if (!webhookUrl || level !== 'error') return;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: "Building Report Monitor",
        embeds: [{
          title: `🚨 System ${level.toUpperCase()} Detected`,
          color: level === 'error' ? 15158332 : 15844367,
          fields: [
            { name: "Event", value: payload.event },
            { name: "Timestamp", value: new Date().toISOString() },
            { name: "Message", value: payload.message || "No message provided" }
          ],
          footer: { text: "Building Report Pro Real-time Monitoring" }
        }]
      })
    });
  } catch (err) {
    // 알림 전송 실패 시 콘솔에만 기록 (무한 루프 방지)
    console.error('Failed to send monitoring notification:', err);
  }
}

export const logger = {
  info: (payload: LogPayload) => {
    console.log(JSON.stringify({ level: 'info', timestamp: new Date().toISOString(), ...payload }));
  },
  warn: (payload: LogPayload) => {
    console.warn(JSON.stringify({ level: 'warn', timestamp: new Date().toISOString(), ...payload }));
  },
  error: (payload: LogPayload) => {
    const logData = { level: 'error', timestamp: new Date().toISOString(), ...payload };
    console.error(JSON.stringify(logData));
    // 에러 발생 시 알림 트리거
    sendNotification('error', payload);
  },
  debug: (payload: LogPayload) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(JSON.stringify({ level: 'debug', timestamp: new Date().toISOString(), ...payload }));
    }
  }
};
