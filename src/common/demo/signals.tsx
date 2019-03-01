import { range } from 'd3-array';
import { generateDate, randomNumber } from './utils';

export const signals = [
  {
    id: '4e228d1cd-de85-5c47-a616-3ee7f38c9422',
    category: 'Threat Intelligence',
    contentType: 'threatintel',
    description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
    name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
    severity: 6,
    timestamp: generateDate(8)
  },
  {
    id: '4e18d1cd-de85-5c67-a616-3ee7f3349422',
    category: 'Defense Evasion',
    contentType: 'rule',
    description: 'TAudit Log Cleared',
    name: 'Windows Audit Log Was Cleared',
    severity: 2,
    timestamp: generateDate(7)
  },
  {
    id: '4e18d1cd-de85-5c67-a616-3e344f38c9422',
    category: 'C2',
    contentType: 'anomaly',
    description:
      'The flows detected have a repeating pattern indicating periodic communication.',
    name: 'Beaconing Communication Detected',
    severity: 5,
    timestamp: generateDate(7)
  },
  {
    id: '232233232-de85-5c67-a616-3ee7f38c9422',
    category: 'Threat Intelligence',
    contentType: 'threatintel',
    description: 'Threat Intelligence match for IOC sunhwakwon.2waky.com',
    name: 'Threat Intelligence match for Hostname: sunhwakwon.2waky.com',
    severity: 0,
    timestamp: generateDate(5)
  },
  {
    id: '4e18d1cd-de85-3433-a616-3ee7f38c9422',
    category: 'Exploitation',
    contentType: 'rule',
    description: 'EDR Log Alert',
    name: 'EDR Log Alert',
    severity: 10,
    timestamp: generateDate(2)
  }
];

export const signalStages = [
  'Unknown',
  'Threat Intelligence',
  'Traffic Anomaly',
  'External Recon',
  'Attack Stage',
  'Exploitation',
  'Collection',
  'Internal Recon',
  'Execution',
  'Persistence',
  'Privilege Escalation',
  'Defense Evasion',
  'Credential Access',
  'Discovery',
  'Lateral Movement',
  'Exfiltration',
  'C2',
  'Rule'
];

export const signalChartData = (() => {
  return signals.map(s => ({
    key: s.timestamp,
    data: s.severity,
    meta: s,
    id: s.id
  }));
})();

export const largeSignalChartData = (() => {
  return range(150)
    .map(i => ({
      key: generateDate(i / randomNumber(1, 3)),
      data: randomNumber(1, 10),
      meta: {
        ...signals[randomNumber(0, signals.length - 1)]
      },
      id: `${new Date().getTime()}-${i}-${randomNumber(0, 500)}`
    }))
    .reverse();
})();

export const signalStageData = (() => {
  return range(15)
    .map(i => ({
      key: generateDate(i / randomNumber(1, 3)),
      data: signals[randomNumber(0, signals.length - 1)].category,
      meta: {
        ...signals[randomNumber(0, signals.length - 1)]
      },
      id: `${new Date().getTime()}-${i}-${randomNumber(0, 500)}`
    }))
    .reverse();
})();

export const medSignalChartData = [...largeSignalChartData].splice(0, 50);
