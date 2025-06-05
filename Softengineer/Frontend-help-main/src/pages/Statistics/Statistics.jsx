import React from 'react';
import Sidebar from '../../components/Sidebar';
import WelcomeHeader from '../../components/WelcomeHeader';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp } from '@mui/icons-material';
// import NotificationBell from '../../components/NotificationBell';
import '../../styles/shared.css';
import './statistics.css';
import pinkArrow from '../../assets/images/3343bba2544df3c41c73ea3771659b42-removebg-preview.png';

const ArrowIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M23 7L13.5 17.5L8.5 12.5L1 20" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M17 7H23V13" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const WhiteArrowIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 4L20 12L12 20" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const Statistics = () => {
  // 生成最近8周的销售数据
  const salesData = [
    { week: 'Week 1', sales: 4200 },
    { week: 'Week 2', sales: 3800 },
    { week: 'Week 3', sales: 4500 },
    { week: 'Week 4', sales: 4100 },
    { week: 'Week 5', sales: 4800 },
    { week: 'Week 6', sales: 5200 },
    { week: 'Week 7', sales: 4900 },
    { week: 'Week 8', sales: 5500 },
  ];

  const customerFlow = [
    {
      subject: 'Morning',
      value: 45,
      fullMark: 100,
      fill: '#1f77b4'
    },
    {
      subject: 'Noon',
      value: 85,
      fullMark: 100,
      fill: '#2ca02c'
    },
    {
      subject: 'Evening',
      value: 35,
      fullMark: 100,
      fill: '#ff7f0e'
    }
  ];

  const categoryData = [
    { name: 'Beverages', value: 46 },
    { name: 'Food', value: 28 },
    { name: 'Stationery', value: 15 },
    { name: 'Daily Necessities', value: 11 },
  ];

  const dailyNewCustomers = [
    { day: 'Mon', customers: 2, color: '#1f77b4' },
    { day: 'Tue', customers: 4, color: '#2ca02c' },
    { day: 'Wed', customers: 1, color: '#ff7f0e' },
    { day: 'Thu', customers: 3, color: '#d62728' },
    { day: 'Fri', customers: 2, color: '#9467bd' },
    { day: 'Sat', customers: 4, color: '#e377c2' },
    { day: 'Sun', customers: 3, color: '#17becf' },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const renderCustomizedLegend = (props) => {
    const { payload } = props;
    
    return (
      <ul className="pie-legend">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: entry.color }} />
            <span className="legend-text">{`${entry.payload.name} ${entry.payload.value}%`}</span>
          </li>
        ))}
      </ul>
    );
  };

  const CustomBar = (props) => {
    const { x, y, width, height, fill } = props;
    const radius = width / 2;

    return (
      <path
        d={`
          M ${x},${y + height}
          C ${x + width / 4},${y + height * 0.9}
            ${x + width * 0.1},${y + height * 0.1}
            ${x + width / 2},${y}
          C ${x + width * 0.9},${y + height * 0.1}
            ${x + width * 0.75},${y + height * 0.9}
            ${x + width},${y + height}
          Z
        `}
        fill={fill}
        stroke="none"
      />
    );
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        {/* <NotificationBell /> */}
        <div className="statistics-welcome-container">
          <WelcomeHeader />
        </div>
        <div className="statistics-content">
          <div className="charts-row">
            <div className="chart-container">
              <h2 className="chart-title">Weekly Sales Trends</h2>
              <div className="chart-wrapper">
                <LineChart
                  width={650}
                  height={220}
                  data={salesData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 10,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="week" 
                    interval={0}
                    padding={{ left: 20, right: 20 }}
                    angle={0}
                    tickMargin={10}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    name="Sales ($)"
                  />
                </LineChart>
              </div>
            </div>
            <div className="chart-container">
              <h2 className="chart-title">Daily Customer Flow</h2>
              <div className="chart-wrapper">
                <RadarChart
                  outerRadius={90}
                  width={400}
                  height={220}
                  data={customerFlow}
                >
                  <PolarGrid 
                    gridType="circle"
                    stroke="#e0e0e0"
                  />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ 
                      fill: '#666',
                      fontSize: 14,
                      fontWeight: 500
                    }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ 
                      fill: '#666',
                      fontSize: 12
                    }}
                  />
                  <Radar
                    name="Customer Flow"
                    dataKey="value"
                    stroke="#1f77b4"
                    fill="#1f77b4"
                    fillOpacity={0.5}
                    data={customerFlow}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '4px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: '10px',
                      fontSize: '12px'
                    }}
                  />
                </RadarChart>
              </div>
            </div>
            <div className="chart-container">
              <h2 className="chart-title">Sales Distribution</h2>
              <div className="chart-wrapper">
                <PieChart width={400} height={150}>
                  <Pie
                    data={categoryData}
                    cx={120}
                    cy={75}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend 
                    content={renderCustomizedLegend}
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                  />
                </PieChart>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div className="chart-container">
                <h2 className="chart-title">Daily New Customers</h2>
                <div className="chart-wrapper">
                  <BarChart
                    width={400}
                    height={150}
                    data={dailyNewCustomers}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      vertical={false}
                    />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false}
                      tickLine={false}
                      fontSize={12}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 5]}
                      ticks={[0, 1, 2, 3, 4, 5]}
                      fontSize={12}
                    />
                    <Tooltip 
                      cursor={false}
                      contentStyle={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="customers" 
                      shape={<CustomBar />}
                      name="New Customers"
                    >
                      {
                        dailyNewCustomers.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </div>
              </div>
              <div style={{
                width: '180px',
                height: '180px',
                background: '#FFFFFF',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                position: 'relative',
                overflow: 'hidden',
                marginTop: '0'
              }}>
                <h2 style={{ 
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '15px',
                  textAlign: 'left',
                  width: '100%'
                }}>
                  Top Sales
                </h2>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: '75px',
                  width: '100%'
                }}>
                  <div style={{
                    color: '#333',
                    fontWeight: 'bold',
                    fontSize: '22px',
                    lineHeight: '1.2',
                    maxWidth: '100px'
                  }}>
                    Strawberry Candy
                  </div>
                  <div style={{
                    width: '55px',
                    height: '55px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <img 
                      src={pinkArrow} 
                      alt="Pink Arrow"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                </div>
                <div style={{
                  marginTop: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <span style={{
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    Sales Growth
                  </span>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#FF69B4'
                  }}>
                    +25%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 