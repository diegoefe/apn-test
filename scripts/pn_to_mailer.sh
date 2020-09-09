#!/usr/bin/env bash

source local_tokens.sh
fecha=$(date "+%Y%m%d_%H%M%S")
curl \
  -X POST \
  -H 'Accept:application/json' \
  -d "{ \"type\": \"notify/ios\", \"params\": { \"event\" : \"NOTIF\", \"event_date\":\"${fecha}\", \"template\":\"notification_simple.txt\", \"custom_data\": { \"camera_name\": \"Mensaje del mailer (${fecha})\" }, \"tokens\" : [ \"${token1}\" ], \"platform\":\"nubicam\" }}" \
http://127.0.0.1:3001/job

