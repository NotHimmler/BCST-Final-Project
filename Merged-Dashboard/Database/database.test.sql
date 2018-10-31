PRINT N'Creating fitbit_steps...';
GO
CREATE SCHEMA [fitbit_steps]
    AUTHORIZATION [dbo];
GO
PRINT N'Creating fitbit_steps.patient...';
GO
CREATE TABLE [fitbit_steps].[patient] (
    [patientID]   INT           IDENTITY (1, 1) NOT NULL,
    [patientName] NVARCHAR (40) NOT NULL,
    [YTDGoals]    INT           NOT NULL,
    [YTDfitbit_steps]     INT           NOT NULL
);
GO
PRINT N'Creating fitbit_steps.Goals...';
GO
CREATE TABLE [fitbit_steps].[Goals] (
    [patientID] INT      NOT NULL,
    [GoalID]    INT      IDENTITY (1, 1) NOT NULL,
    [GoalDate]  DATETIME NOT NULL,
    [FilledDate] DATETIME NULL,
    [Status]     CHAR (1) NOT NULL,
    [Amount]     INT      NOT NULL
);
GO
PRINT N'Creating fitbit_steps.Def_patient_YTDGoals...';
GO
ALTER TABLE [fitbit_steps].[patient]
    ADD CONSTRAINT [Def_patient_YTDGoals] DEFAULT 0 FOR [YTDGoals];
GO
PRINT N'Creating fitbit_steps.Def_patient_YTDfitbit_steps...';
GO
ALTER TABLE [fitbit_steps].[patient]
    ADD CONSTRAINT [Def_patient_YTDfitbit_steps] DEFAULT 0 FOR [YTDfitbit_steps];
GO
PRINT N'Creating fitbit_steps.Def_Goals_GoalDate...';
GO
ALTER TABLE [fitbit_steps].[Goals]
    ADD CONSTRAINT [Def_Goals_GoalDate] DEFAULT GetDate() FOR [GoalDate];
GO
PRINT N'Creating fitbit_steps.Def_Goals_Status...';
GO
ALTER TABLE [fitbit_steps].[Goals]
    ADD CONSTRAINT [Def_Goals_Status] DEFAULT 'O' FOR [Status];
GO
PRINT N'Creating fitbit_steps.PK_patient_CustID...';
GO
ALTER TABLE [fitbit_steps].[patient]
    ADD CONSTRAINT [PK_patient_CustID] PRIMARY KEY CLUSTERED ([patientID] ASC) WITH (ALLOW_PAGE_LOCKS = ON, ALLOW_ROW_LOCKS = ON, PAD_INDEX = OFF, IGNORE_DUP_KEY = OFF, STATISTICS_NORECOMPUTE = OFF);
GO
PRINT N'Creating fitbit_steps.PK_Goals_GoalID...';
GO
ALTER TABLE [fitbit_steps].[Goals]
    ADD CONSTRAINT [PK_Goals_GoalID] PRIMARY KEY CLUSTERED ([GoalID] ASC) WITH (ALLOW_PAGE_LOCKS = ON, ALLOW_ROW_LOCKS = ON, PAD_INDEX = OFF, IGNORE_DUP_KEY = OFF, STATISTICS_NORECOMPUTE = OFF);
GO
PRINT N'Creating fitbit_steps.FK_Goals_patient_CustID...';
GO
ALTER TABLE [fitbit_steps].[Goals]
    ADD CONSTRAINT [FK_Goals_patient_CustID] FOREIGN KEY ([patientID]) REFERENCES [fitbit_steps].[patient] ([patientID]) ON DELETE NO ACTION ON UPDATE NO ACTION;
GO
PRINT N'Creating fitbit_steps.CK_Goals_FilledDate...';
GO
ALTER TABLE [fitbit_steps].[Goals]
    ADD CONSTRAINT [CK_Goals_FilledDate] CHECK ((FilledDate >= GoalDate) AND (FilledDate < '01/01/2020'));
GO
PRINT N'Creating fitbit_steps.CK_Goals_GoalDate...';
GO
ALTER TABLE [fitbit_steps].[Goals]
    ADD CONSTRAINT [CK_Goals_GoalDate] CHECK ((GoalDate > '01/01/2005') and (GoalDate < '01/01/2020'));
GO
PRINT N'Creating fitbit_steps.uspCancelGoal...';
GO
CREATE PROCEDURE [fitbit_steps].[uspCancelGoal]
@GoalID INT
AS
BEGIN
DECLARE @Delta INT, @patientID INT
BEGIN TRANSACTION
    SELECT @Delta = [Amount], @patientID = [patientID]
     FROM [fitbit_steps].[Goals] WHERE [GoalID] = @GoalID;

UPDATE [fitbit_steps].[Goals]
   SET [Status] = 'X'
WHERE [GoalID] = @GoalID;

UPDATE [fitbit_steps].[patient]
   SET
   YTDGoals = YTDGoals - @Delta
    WHERE [patientID] = @patientID
COMMIT TRANSACTION
END
GO
PRINT N'Creating fitbit_steps.uspFillGoal...';
GO
CREATE PROCEDURE [fitbit_steps].[uspFillGoal]
@GoalID INT, @FilledDate DATETIME
AS
BEGIN
DECLARE @Delta INT, @patientID INT
BEGIN TRANSACTION
    SELECT @Delta = [Amount], @patientID = [patientID]
     FROM [fitbit_steps].[Goals] WHERE [GoalID] = @GoalID;

UPDATE [fitbit_steps].[Goals]
   SET [Status] = 'F',
       [FilledDate] = @FilledDate
WHERE [GoalID] = @GoalID;

UPDATE [fitbit_steps].[patient]
   SET
   YTDfitbit_steps = YTDfitbit_steps - @Delta
    WHERE [patientID] = @patientID
COMMIT TRANSACTION
END
GO
PRINT N'Creating fitbit_steps.uspNewpatient...';
GO
CREATE PROCEDURE [fitbit_steps].[uspNewpatient]
@patientName NVARCHAR (40)
AS
BEGIN
INSERT INTO [fitbit_steps].[patient] (patientName) VALUES (@patientName);
SELECT SCOPE_IDENTITY()
END
GO
PRINT N'Creating fitbit_steps.uspPlaceNewGoal...';
GO
CREATE PROCEDURE [fitbit_steps].[uspPlaceNewGoal]
@patientID INT, @Amount INT, @GoalDate DATETIME, @Status CHAR (1)='O'
AS
BEGIN
DECLARE @RC INT
BEGIN TRANSACTION
INSERT INTO [fitbit_steps].[Goals] (patientID, GoalDate, FilledDate, Status, Amount)
     VALUES (@patientID, @GoalDate, NULL, @Status, @Amount)
SELECT @RC = SCOPE_IDENTITY();
UPDATE [fitbit_steps].[patient]
   SET
   YTDGoals = YTDGoals + @Amount
    WHERE [patientID] = @patientID
COMMIT TRANSACTION
RETURN @RC
END
GO
CREATE PROCEDURE [fitbit_steps].[uspShowGoalDetails]
@patientID INT=0
AS
BEGIN
SELECT [C].[patientName], CONVERT(date, [O].[GoalDate]), CONVERT(date, [O].[FilledDate]), [O].[Status], [O].[Amount]
  FROM [fitbit_steps].[patient] AS C
  INNER JOIN [fitbit_steps].[Goals] AS O
     ON [O].[patientID] = [C].[patientID]
  WHERE [C].[patientID] = @patientID
END
GO
