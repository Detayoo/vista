import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Progress } from './ui/Progress';

const DonationProgress = ({ current, target }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  const progressPercentage = Math.min((current / target) * 100, 100);
  
  useEffect(() => {
    // Create or update chart
    if (chartRef && chartRef.current) {
      // Destroy previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Raised', 'Remaining'],
          datasets: [{
            data: [current, Math.max(target - current, 0)],
            backgroundColor: [
              'rgba(99, 102, 241, 0.8)',  // Indigo for raised
              'rgba(224, 231, 255, 0.6)', // Light indigo for remaining
            ],
            borderColor: [
              'rgba(99, 102, 241, 1)',
              'rgba(224, 231, 255, 1)',
            ],
            borderWidth: 1,
          }]
        },
        options: {
          cutout: '70%',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${context.raw.toFixed(2)} ETH`;
                }
              }
            }
          }
        }
      });
    }
    
    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [current, target]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Funding Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 relative flex items-center justify-center">
          <canvas ref={chartRef} height="200"></canvas>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-indigo-600">{current.toFixed(2)}</span>
            <span className="text-sm text-gray-500">of {target} ETH</span>
          </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress ({progressPercentage.toFixed(0)}%)
              </span>
              <span className="text-sm font-medium text-gray-700">
                {current.toFixed(2)} / {target} ETH
              </span>
            </div>
            <Progress value={progressPercentage} />
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-blue-800 mb-2">Fundraising Stats</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-600">Raised</p>
                <p className="font-bold">{current.toFixed(2)} ETH</p>
              </div>
              <div>
                <p className="text-gray-600">Goal</p>
                <p className="font-bold">{target} ETH</p>
              </div>
              <div>
                <p className="text-gray-600">Remaining</p>
                <p className="font-bold">{Math.max(target - current, 0).toFixed(2)} ETH</p>
              </div>
              <div>
                <p className="text-gray-600">Completion</p>
                <p className="font-bold">{progressPercentage.toFixed(0)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationProgress;
