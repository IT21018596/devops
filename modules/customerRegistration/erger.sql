USE [StarLIB]
GO

/****** Object:  StoredProcedure [dbo].[Put_LIB_Members]    Script Date: 12/24/2023 11:28:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Manoj Withanage>
-- Create date: <8/11/2023>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[Put_LIB_Members]
    (
        @nMemberID int,
        @cFtyCode char(3),
        @cEPF varchar(10),
        @cLibCode char(4),
        @cFiratName varchar(50),
        @cLastName varchar(50),
        @cCommonName varchar(50),
        @nDepID int,
        @cSection varchar(40),
        @cDesignation varchar(50),
        @cAddress1 varchar(80),
        @cAddress2 varchar(50),
        @cCity varchar(50),
        @cPermanentAddress varchar(150),
        @cEmailCompany varchar(40),
        @cMailPrivate varchar(50),
        @cMobileNo varchar(15),
        @cLandPhone varchar(15),
        @cPhoneExtenton varchar(5),
        @cRemarks varchar(100),
        @cUserName varchar(15),
        @cUserQRUrl varchar(5000),
        @outputMassage varchar(50) OUTPUT
    )
AS
BEGIN
    BEGIN TRANSACTION

    DECLARE @cRank char(3)

    UPDATE [dbo].[LIB_Members] SET
        [cFtyCode] = @cFtyCode,
        [cEPF] = @cEPF,
        [cLibCode] = @cLibCode,
        [cFiratName] = @cFiratName,
        [cLastName] = @cLastName,
        [cCommonName] = @cCommonName,
        [nDepID] = @nDepID,
        [cSection] = @cSection,
        [cDesignation] = @cDesignation,
        [cAddress1] = @cAddress1,
        [cAddress2] = @cAddress2,
        [cCity] = @cCity,
        [cPermanentAddress] = @cPermanentAddress,
        [cEmailCompany] = @cEmailCompany,
        [cMailPrivate] = @cMailPrivate,
        [cMobileNo] = @cMobileNo,
        [cLandPhone] = @cLandPhone,
        [cPhoneExtenton] = @cPhoneExtenton,
        [cRemarks] = @cRemarks,
        [cEditBy] = @cUserName,
        [dEditDate] = GETDATE()
    WHERE nMemberID = @nMemberID

    IF @@ERROR = 0
    BEGIN
        SELECT @cRank = cMemberRankCode FROM StarLIB.dbo.LIB_Members WHERE nMemberID = @nMemberID;
        IF @cRank = 'REQ'
        BEGIN
                UPDATE StarLIB.dbo.LIB_Members
                SET cMemberRankCode = 'MEM',
                    dRegisteredOn = GETDATE(),
                    cRegisteredBy = @cUserName,
                    nStatusID = 1,
                    dStatusDate = GETDATE(),
                    cUserQRUrl = @cUserQRUrl
                WHERE nMemberID = @nMemberID
    
                IF @@ERROR = 0
                BEGIN
                    COMMIT TRANSACTION
                    SET @outputMassage = 'Ok'
                END
                ELSE
                BEGIN
                    ROLLBACK TRANSACTION
                    SET @outputMassage = 'Error'
                END
        END
    END
    ELSE
    BEGIN
        ROLLBACK TRANSACTION
        SET @outputMassage = 'Error'
    END
END
