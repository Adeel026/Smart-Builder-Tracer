import React from 'react';
import { Typography, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const ConstructionDetails = () => {
  const data = [
    ["ITEM", "ECONOMY CLASS ( STARTING  FROM)\nRS: 3550 SQT", "STANDARD CLASS ( STARTING  FROM)\nRS: 4550 SQT", "PREMIUM  CLASS ( STARTING  FROM)\nRS: 7450 SQT"],
    ["Brick / Block", "1st Class", "1st Class", "1st Class"],
    ["Sand", "Local", "River", "River"],
    ["Crush", "Mangla / Dina", "Mangla / Dina", "Margla"],
    ["Steel", "40 Grade", "40 Grade", "60 Grade"],
    ["Cement", "Good Quality", "Bestway or Equivalent", "Bestway or Equivalent"],
    ["Excavation", "2.5 Feet Deep", "2.5 Feet Deep", "2.5 Feet Deep"],
    ["Earth Filling", "3 Feet", "3 Feet", "3 Feet"],
    ["Structure", "Load Bearing", "Semi Frame Structure", "Fully Frame Structure"],
    ["D.P.C (1:2:4)", "Plastic Sheet", "1 inch Thick Marble", "1 inch Thick Marble"],
    ["Door Frame", "Jisti (16 Gauage)", "Jisti (14 Gauage)", "Diar"],
    ["Door", "China Ply", "Malaysian Ply + Main Door (Thailand Nandri Wood)", "Diar"],
    ["Window", "Iron Window + Net", "Iron Grill + Aluminum Window 1.6mm + Glass 5mm + Net", "UPVC (Heat + Dust + Sound Proof)"],
    ["Kitchen Cabinet", "N/A", "MDF", "Fully Furnished Italian Kitchen"],
    ["Kitchen Shelf", "Sunny Grey Marble", "Jet Black Marble", "Fully Furnished Italian Kitchen"],
    ["Floor", "P.C.C", "Sunny Grey/Tippi", "Imported up to 5000/m2"],
    ["Stair Railing", "Brick Masonry", "Stainless Steel", "Wood / Glass / CNC"],
    ["Paint", "Good Quality", "Master / Diamond / Brighto", "ICI / Jotun"],
    ["Washroom Tiles", "N/A", "Master / Equivalent", "Imported up to 3000/m2"],
    ["Washroom Fittings", "Good Quality", "Master / Total", "Faisal / equivalent"],
    ["Washroom Seats", "Good Quality", "Master / Total", "Porta 2Pcs"],
    ["Electric Work", "4 Lights + 1 Board", "4 Lights + 1 Board + AC Point + Bed Points", "6 Lights + 1 Board + AC Points + Bed Point (Okasha Digital switches with mobile control)"],
    ["Electric Fan", "Good Quality", "GFC / Pak Fan / Khursheed Fan (Regular)", "GFC / Pak Fan / Khursheed Fan (Fancy)"],
    ["Electric Wire", "Good Quality", "GM / Fast", "Pakistan Cable"],
    ["Sanitary + Electric Pipe", "Good Quality", "GM / Plasco", "Popular / Dadex"],
    ["Water Tank", "Available (Good Quality) 500 Liter", "Available (DURA) 750 Liter", "Available (DURA) 1200 Liter"],
    ["Ceiling", "N/A", "Border / Gola", "Full Ceiling"],
    ["Gas Points", "N/A", "Available", "Available"],
    ["UPS Wiring", "N/A", "Available", "Available"],
    ["Wardrobe", "N/A", "N/A", "Available"],
    ["Water Pump", "N/A", "N/A", "Bore upto 220 feet"],
    ["CCTV", "N/A", "N/A", "Available"],
    ["Weather Insulation", "N/A", "N/A", "Thermopal Insulation at Outer Wall + Slab"],
    ["Water Proofing", "N/A", "N/A", "Special Japanese Coating at roof"]
  ];


  return (
    <div>
      {/* <Typography variant="h4" style={{ marginBottom: '1rem' }}>
        House Construction Costs and Material Details
      </Typography> */}
      
      <h1 className=' font-serif flex justify-center text-3xl mt-4 mb-3 bg-red-950 py-10 text-white'>
        House Construction Costs and Material Details
      </h1>
      <p className='flex justify-center  text-xl mt-2'>Note: This is updated on 12/08/2023</p>
      <Paper elevation={15} style={{ padding: '1rem' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {data[0].map((header, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    style={{ fontWeight: 'bold', border: '1px solid black' }}
                  >
                    {header}
                  </TableCell>

                ))}


              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(1).map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      align="center"
                      style={{ border: '1px solid black' }} // Add border here
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default ConstructionDetails;
