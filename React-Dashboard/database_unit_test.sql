SELECT @RC = 0,
       @NewPatientID = 0,
   @PatientID = 0,
       @PatientName = N'Fictitious Patient';

IF NOT EXISTS(SELECT * FROM [Patient].[PatientID] WHERE PatientName = @Name)
BEGIN
EXECUTE @NewPatientID = [Fitbit].[uspNewPatient] @PatientName;
END

-- NOTE: Assumes that you inserted a Patient record with PatientName='Fictitious Patient' in the pre-test script.
SELECT @PatientID = [PatientID] FROM [Fitbit].[Patient] WHERE [PatientName] = @PatientName;

-- delete any old records in the Fitbits table and clear out the YTD Fitbit/Fitbits fields
DELETE from [Fitbit].[steps] WHERE [PatientID] = @PatientID;
UPDATE [Fitbit].[Patient] SET steps = 0, YTDFitbit = 0 WHERE [PatientID] = @PatientID;


DECLARE @RC AS INT, @patientID AS INT, @Amount AS INT, @FilledDate AS DATETIME, @Status AS CHAR (1);
DECLARE @patientName AS NVARCHAR(40), @FitbitID AS INT;

SELECT @RC = 0,
       @patientID = 0,
       @FitbitID = 0,
       @patientName = N'Fictitious patient',
       @Amount = 100,
       @FilledDate = getdate(),
       @Status = 'O';

-- NOTE: Assumes that you inserted a patient record with patientName='Fictitious patient' in the pre-test script.
SELECT @patientID = [patientID] FROM [steps].[patient] WHERE [patientName] = @patientName;
-- Get the most recently added Fitbit.
SELECT @FitbitID = MAX([FitbitID]) FROM [steps].[Fitbits] WHERE [patientID] = @patientID;

-- fill an fitbitfor that patient
EXECUTE @RC = [steps].[uspFillFitbit] @FitbitID, @FilledDate;

-- verify that the YTDFitbits value is correct.
SELECT @RC = [YTDsteps] FROM [steps].[patient] WHERE [patientID] = @patientID

SELECT @RC AS RC;


BEGIN TRANSACTION

-- Add a patient for this test with the name 'patientB'
DECLARE @NewpatientID AS INT, @RC AS INT, @patientName AS NVARCHAR (40);

SELECT @RC = 0,
       @NewpatientID = 0,
       @patientName = N'Fictitious patient';

IF NOT EXISTS(SELECT * FROM [steps].[patient] WHERE patientName = @patientName)
BEGIN
EXECUTE @NewpatientID = [steps].[uspNewpatient] @patientName;
END

DECLARE @patientID AS INT, @Amount AS INT, @FitbitDate AS DATETIME, @Status AS CHAR (1);

SELECT @RC = 0,
       @patientID = 0,
       @patientName = N'Fictitious patient',
       @Amount = 100,
       @FitbitDate = getdate(),
       @Status = 'O';

-- NOTE: Assumes that you inserted a patient record with patientName='Fictitious patient' in the pre-test script.
SELECT @patientID = [patientID] FROM [steps].[patient] WHERE [patientName] = @patientName;

-- delete any old records in the Fitbits table and clear out the YTD steps/Fitbits fields
DELETE from [steps].[Fitbits] WHERE [patientID] = @patientID;
UPDATE [steps].[patient] SET YTDFitbits = 0, YTDsteps = 0 WHERE [patientID] = @patientID;

-- place an Fitbit for that patient
EXECUTE @RC = [steps].[uspPlaceNewFitbit] @patientID, @Amount, @FitbitDate, @Status;

COMMIT TRANSACTION



BEGIN TRANSACTION

-- Add a patient for this test with the name 'Fictitiouspatient'
DECLARE @NewpatientID AS INT, @RC AS INT, @patientName AS NVARCHAR (40);

SELECT @RC = 0,
       @NewpatientID = 0,
       @patientName = N'Fictitious patient';

IF NOT EXISTS(SELECT * FROM [steps].[patient] WHERE patientName = @patientName)
BEGIN
EXECUTE @NewpatientID = [steps].[uspNewpatient] @patientName;
END


DECLARE @patientID AS INT, @Amount AS INT, @FitbitDate AS DATETIME, @Status AS CHAR (1);

SELECT @RC = 0,
       @patientID = 0,
       @patientName = N'Fictitious patient',
       @FitbitDate = getdate(),
       @Status = 'O';
   
-- NOTE: Assumes that you inserted a patient record with patientName='Fictitious patient' in the pre-test script.
SELECT @patientID = [patientID] FROM [steps].[patient] WHERE [patientName] = @patientName;

-- delete any old records in the Fitbits table and clear out the YTD steps/Fitbits fields
DELETE from [steps].[Fitbits] WHERE [patientID] = @patientID;
UPDATE [steps].[patient] SET YTDFitbits = 0, YTDsteps = 0 WHERE [patientID] = @patientID;

-- place 3 Fitbits for that patient
EXECUTE @RC = [steps].[uspPlaceNewFitbit] @patientID, 100, @FitbitDate, @Status;
EXECUTE @RC = [steps].[uspPlaceNewFitbit] @patientID, 50, @FitbitDate, @Status;
EXECUTE @RC = [steps].[uspPlaceNewFitbit] @patientID, 5, @FitbitDate, @Status;

COMMIT TRANSACTION
