/* eslint-disable import/extensions */
import Widget from './Widget';

const widget = new Widget('wss://ahj-sse-ws-chat.herokuapp.com/ws');

// const widget = new Widget('ws://localhost:8080/ws');

widget.createForm();
