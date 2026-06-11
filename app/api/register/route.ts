import { google } from 'googleapis';
import path from 'path';
import { NextResponse } from 'next/server';

const SPREADSHEET_ID = '18NcEHt8hHtNXB6WFQLC7_xJ411qriibOf4JMco7bYjY';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function getFirstSheetNameAndId(spreadsheetId: string) {
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
  const sheet = spreadsheet.data.sheets?.[0];
  if (!sheet || !sheet.properties || !sheet.properties.title) {
    throw new Error('Aucune feuille trouvée dans le document.');
  }
  return {
    sheetName: sheet.properties.title,
    sheetId: sheet.properties.sheetId,
  };
}

async function initializeSheetIfEmpty(spreadsheetId: string, sheetName: string, sheetId: number | null | undefined) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:H1`,
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      console.log("La feuille est vide. Initialisation des en-têtes...");

      const headers = [
        'FirstName',
        'LastName',
        'Email',
        'Phone',
        'Role',
        'TicketType',
        'Status',
        'SubmittedAt'
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1:H1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [headers],
        },
      });

      if (sheetId !== null && sheetId !== undefined) {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [
              {
                updateSheetProperties: {
                  properties: {
                    sheetId: sheetId,
                    gridProperties: {
                      frozenRowCount: 1,
                    },
                  },
                  fields: 'gridProperties.frozenRowCount',
                },
              },
              {
                repeatCell: {
                  range: {
                    sheetId: sheetId,
                    startRowIndex: 0,
                    endRowIndex: 1,
                    startColumnIndex: 0,
                    endColumnIndex: headers.length,
                  },
                  cell: {
                    userEnteredFormat: {
                      backgroundColor: { red: 0.18, green: 0.36, blue: 0.59 },
                      textFormat: {
                        bold: true,
                        foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 },
                        fontSize: 11,
                      },
                      horizontalAlignment: 'CENTER',
                    },
                  },
                  fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)',
                },
              },
              {
                addBanding: {
                  bandedRange: {
                    range: {
                      sheetId: sheetId,
                      startRowIndex: 0,
                      endRowIndex: 1000,
                      startColumnIndex: 0,
                      endColumnIndex: headers.length,
                    },
                    rowProperties: {
                      headerColor: { red: 0.18, green: 0.36, blue: 0.59 },
                      firstBandColor: { red: 1.0, green: 1.0, blue: 1.0 },
                      secondBandColor: { red: 0.95, green: 0.96, blue: 0.98 }
                    }
                  }
                }
              },
              {
                repeatCell: {
                  range: { sheetId: sheetId, startRowIndex: 1, startColumnIndex: 0, endColumnIndex: 8 },
                  cell: { userEnteredFormat: { wrapStrategy: "WRAP" } },
                  fields: "userEnteredFormat(wrapStrategy)"
                }
              },
              {
                setDataValidation: {
                  range: { sheetId: sheetId, startRowIndex: 1, startColumnIndex: 4, endColumnIndex: 5 },
                  rule: {
                    condition: {
                      type: "ONE_OF_LIST",
                      values: [
                        { userEnteredValue: "aiesecer_lcp_lcvp" },
                        { userEnteredValue: "aiesecer_eb_member" },
                        { userEnteredValue: "alumni" },
                        { userEnteredValue: "partner" },
                        { userEnteredValue: "external" }
                      ]
                    },
                    showCustomUi: true,
                    strict: false
                  }
                }
              },
              {
                setDataValidation: {
                  range: { sheetId: sheetId, startRowIndex: 1, startColumnIndex: 5, endColumnIndex: 6 },
                  rule: {
                    condition: {
                      type: "ONE_OF_LIST",
                      values: [{ userEnteredValue: "solo" }, { userEnteredValue: "couple" }]
                    },
                    showCustomUi: true,
                    strict: false
                  }
                }
              },
              {
                setDataValidation: {
                  range: { sheetId: sheetId, startRowIndex: 1, startColumnIndex: 6, endColumnIndex: 7 },
                  rule: {
                    condition: {
                      type: "ONE_OF_LIST",
                      values: [{ userEnteredValue: "pending" }, { userEnteredValue: "paid" }, { userEnteredValue: "cancelled" }]
                    },
                    showCustomUi: true,
                    strict: false
                  }
                }
              },
              // Couleurs pour Status "pending"
              {
                addConditionalFormatRule: {
                  rule: {
                    ranges: [{ sheetId: sheetId, startRowIndex: 1, startColumnIndex: 6, endColumnIndex: 7 }],
                    booleanRule: {
                      condition: { type: "TEXT_EQ", values: [{ userEnteredValue: "pending" }] },
                      format: { backgroundColor: { red: 1.0, green: 0.95, blue: 0.8 }, textFormat: { foregroundColor: { red: 0.6, green: 0.4, blue: 0.0 }, bold: true } }
                    }
                  },
                  index: 0
                }
              },
              // Couleurs pour Status "paid"
              {
                addConditionalFormatRule: {
                  rule: {
                    ranges: [{ sheetId: sheetId, startRowIndex: 1, startColumnIndex: 6, endColumnIndex: 7 }],
                    booleanRule: {
                      condition: { type: "TEXT_EQ", values: [{ userEnteredValue: "paid" }] },
                      format: { backgroundColor: { red: 0.85, green: 1.0, blue: 0.85 }, textFormat: { foregroundColor: { red: 0.0, green: 0.5, blue: 0.0 }, bold: true } }
                    }
                  },
                  index: 1
                }
              },
              // Couleurs pour Status "cancelled"
              {
                addConditionalFormatRule: {
                  rule: {
                    ranges: [{ sheetId: sheetId, startRowIndex: 1, startColumnIndex: 6, endColumnIndex: 7 }],
                    booleanRule: {
                      condition: { type: "TEXT_EQ", values: [{ userEnteredValue: "cancelled" }] },
                      format: { backgroundColor: { red: 1.0, green: 0.85, blue: 0.85 }, textFormat: { foregroundColor: { red: 0.6, green: 0.0, blue: 0.0 }, bold: true } }
                    }
                  },
                  index: 2
                }
              },
              // Couleurs pour TicketType "solo"
              {
                addConditionalFormatRule: {
                  rule: {
                    ranges: [{ sheetId: sheetId, startRowIndex: 1, startColumnIndex: 5, endColumnIndex: 6 }],
                    booleanRule: {
                      condition: { type: "TEXT_EQ", values: [{ userEnteredValue: "solo" }] },
                      format: { backgroundColor: { red: 0.9, green: 0.95, blue: 1.0 }, textFormat: { foregroundColor: { red: 0.0, green: 0.3, blue: 0.7 }, bold: true } }
                    }
                  },
                  index: 3
                }
              },
              // Couleurs pour TicketType "couple"
              {
                addConditionalFormatRule: {
                  rule: {
                    ranges: [{ sheetId: sheetId, startRowIndex: 1, startColumnIndex: 5, endColumnIndex: 6 }],
                    booleanRule: {
                      condition: { type: "TEXT_EQ", values: [{ userEnteredValue: "couple" }] },
                      format: { backgroundColor: { red: 0.95, green: 0.85, blue: 1.0 }, textFormat: { foregroundColor: { red: 0.4, green: 0.0, blue: 0.6 }, bold: true } }
                    }
                  },
                  index: 4
                }
              }
            ],
          },
        });
        console.log("En-têtes créés et formatés avec succès !");
      }
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la feuille :", error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { firstName, lastName, email, phone, role, ticketType } = body;
    
    if (!firstName || !lastName || !email || !phone || !role || !ticketType) {
      return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 });
    }

    const { sheetName, sheetId } = await getFirstSheetNameAndId(SPREADSHEET_ID);
    
    await initializeSheetIfEmpty(SPREADSHEET_ID, sheetName, sheetId);

    const formattedPhone = phone.startsWith('+') ? "'" + phone : phone;

    const rowData = [
      firstName,
      lastName,
      email,
      formattedPhone,
      role,
      ticketType,
      'pending', // Status initial
      new Date().toISOString()
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:H`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    });

    // Redimensionnement automatique des colonnes pour qu'elles s'adaptent au contenu
    if (sheetId !== null && sheetId !== undefined) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              autoResizeDimensions: {
                dimensions: {
                  sheetId: sheetId,
                  dimension: "COLUMNS",
                  startIndex: 0,
                  endIndex: 8
                }
              }
            }
          ]
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Erreur lors de la soumission :', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
