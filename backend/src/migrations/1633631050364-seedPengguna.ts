import { MigrationInterface, QueryRunner } from "typeorm";

export class seedPengguna1633631050364 implements MigrationInterface {
  name = "seedPengguna1633631050364";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "pengguna" ("id", "nip", "nama", "jabatan", "instansi", "subBagian", "fotoProfil", "createdAt", "updatedAt") VALUES
(490,	'196309131986031014',	'HERI SUSANTO',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.412868',	'2021-10-07 16:13:39.412868'),
(500,	'196501012007011048',	'M A R Z U K I',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.50476',	'2021-10-07 16:13:39.50476'),
(508,	'196505231990032005',	'SRI AYATI LASASI.',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.55125',	'2021-10-07 16:13:39.55125'),
(518,	'196701281986032003',	'JOHARTIN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.645957',	'2021-10-07 16:13:39.645957'),
(528,	'196904221993032011',	'W A H I D A.',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.730458',	'2021-10-07 16:13:39.730458'),
(536,	'197009202016041001',	'IHSAN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.834457',	'2021-10-07 16:13:39.834457'),
(546,	'197212032002121006',	'SLAMET WIDODO, S.SOS',	'KASUBAG',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.962737',	'2021-10-07 16:13:39.962737'),
(554,	'197407052014081002',	'MUSDIN DJADDUNG',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.079496',	'2021-10-07 16:13:40.079496'),
(564,	'197509212007012015',	'MARTHINA WENGKAU',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.137545',	'2021-10-07 16:13:40.137545'),
(573,	'197610052001122003',	'INGE MOGALESTARI, S.PI,M.Si',	'KASUBAG',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.198828',	'2021-10-07 16:13:40.198828'),
(582,	'197806042014081001',	'AKSAN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.290412',	'2021-10-07 16:13:40.290412'),
(590,	'197909132014082001',	'HASTUTI',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.348188',	'2021-10-07 16:13:40.348188'),
(601,	'198012262016041001',	'DEFID NATANEL',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.423229',	'2021-10-07 16:13:40.423229'),
(610,	'198208022016042001',	'IRMA AMAN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.57025',	'2021-10-07 16:13:40.57025'),
(620,	'198311102016042001',	'YANI HASE',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.650301',	'2021-10-07 16:13:40.650301'),
(629,	'198406162014082001',	'WIWI SUSANTI',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.732771',	'2021-10-07 16:13:40.732771'),
(639,	'198601162010011011',	'REZLY HARDIANTO, SE',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.806803',	'2021-10-07 16:13:40.806803'),
(648,	'199108252012061001',	'WAHYU HIDAYAT, S.STP',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.899974',	'2021-10-07 16:13:40.899974'),
(491,	'196405141989031012',	'KAHARUDIN, SE,MM',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.415631',	'2021-10-07 16:13:39.415631'),
(503,	'196505151988112002',	'DEWI SRI',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.521763',	'2021-10-07 16:13:39.521763'),
(513,	'196602071992031008',	'CHALIK A.PELANG',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.596275',	'2021-10-07 16:13:39.596275'),
(521,	'196710172009021001',	'INCE WAHYUDDIN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.693655',	'2021-10-07 16:13:39.693655'),
(531,	'197004042009011005',	'ARNOLD ALBERT KEREH',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.772077',	'2021-10-07 16:13:39.772077'),
(541,	'197201082007011023',	'MANSUR P. SARIPI',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.898774',	'2021-10-07 16:13:39.898774'),
(549,	'197303122009041001',	'ASGAP',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.045756',	'2021-10-07 16:13:40.045756'),
(559,	'197412152005021002',	'IRFAN, SH, M.Si',	'KABAG',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.10982',	'2021-10-07 16:13:40.10982'),
(567,	'197512232007011016',	'IWAN, S.Kom., M.Si',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.167956',	'2021-10-07 16:13:40.167956'),
(577,	'197705122014081002',	'SUAIB, SH',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.249402',	'2021-10-07 16:13:40.249402'),
(586,	'197811262014082001',	'DINI NOVITA',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.322657',	'2021-10-07 16:13:40.322657'),
(595,	'198001092008011004',	'HENDRA DJUDILA',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.377385',	'2021-10-07 16:13:40.377385'),
(604,	'198107042008011012',	'IBRAHIM',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.429511',	'2021-10-07 16:13:40.429511'),
(613,	'198301172016041001',	'ZULKIFLI',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.577898',	'2021-10-07 16:13:40.577898'),
(623,	'198402192006042009',	'SAMSIAR',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.661779',	'2021-10-07 16:13:40.661779'),
(632,	'198501012014081003',	'ANDAR PRADESA',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.740608',	'2021-10-07 16:13:40.740608'),
(642,	'198607172010011002',	'AZMI, S.Sos.M.Si',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.817156',	'2021-10-07 16:13:40.817156'),
(652,	'199707122019081001',	'MOH. RIFALDY, S.STP',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.909284',	'2021-10-07 16:13:40.909284'),
(492,	'196405242007012005',	'DRA.SITI UNIS',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.418493',	'2021-10-07 16:13:39.418493'),
(504,	'196310012009011002',	'MULYADI',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.523373',	'2021-10-07 16:13:39.523373'),
(514,	'196603122006041014',	'A R I S T E N',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.598469',	'2021-10-07 16:13:39.598469'),
(522,	'196806202007011022',	'I R H A M',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.695225',	'2021-10-07 16:13:39.695225'),
(532,	'197004241992032010',	'S A M S I D A R',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.774341',	'2021-10-07 16:13:39.774341'),
(542,	'197202022007012048',	'HATIJA MANOSO',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.900123',	'2021-10-07 16:13:39.900123'),
(550,	'197306282007011006',	'MOH. SAFAAT',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.047484',	'2021-10-07 16:13:40.047484'),
(560,	'197501172014081001',	'IRWAN SAKTIAWAN,S.Sos',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.11109',	'2021-10-07 16:13:40.11109'),
(568,	'197512262007011014',	'BUDI KURNIAWAN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.169003',	'2021-10-07 16:13:40.169003'),
(578,	'197706022007011022',	'JUNAEDI',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.251195',	'2021-10-07 16:13:40.251195'),
(587,	'197812292016071001',	'RONAL',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.323704',	'2021-10-07 16:13:40.323704'),
(596,	'198002202009012004',	'D E I S I',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.378663',	'2021-10-07 16:13:40.378663'),
(605,	'198109212005022003',	'U L F A, S.KOM',	'KASUBAG',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.43078',	'2021-10-07 16:13:40.43078'),
(614,	'198302062008011007',	'ARIF BUDIMAN M.LATJINDOLO',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.579775',	'2021-10-07 16:13:40.579775'),
(624,	'198403292014082002',	'YERMIN DONGALEMBA',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.663177',	'2021-10-07 16:13:40.663177'),
(633,	'198501032016042001',	'SRILYQUARDASI',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.742336',	'2021-10-07 16:13:40.742336'),
(643,	'198608172006021001',	'ALLAN BUDIWAN KUMAAT, SSTP',	'KASUBAG',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.81855',	'2021-10-07 16:13:40.81855'),
(493,	'196409072007011014',	'RISMAN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.420829',	'2021-10-07 16:13:39.420829'),
(510,	'196310301984092002',	'RUTLI DERCE MBATA',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.530205',	'2021-10-07 16:13:39.530205'),
(525,	'196812081995031004',	'R I Z A L',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.707289',	'2021-10-07 16:13:39.707289'),
(538,	'197102282002121005',	'WARHAM LUMBENGI ,SE',	'KABAG',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.838828',	'2021-10-07 16:13:39.838828'),
(556,	'197408242008011008',	'Y U S A K, S.A.P',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.080658',	'2021-10-07 16:13:40.080658'),
(574,	'197611012014082001',	'EKAWATI',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.204131',	'2021-10-07 16:13:40.204131'),
(592,	'197903132016041001',	'MAHARUDIN GANI',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.330853',	'2021-10-07 16:13:40.330853'),
(608,	'198110212014081001',	'AKBAR',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.450948',	'2021-10-07 16:13:40.450948'),
(619,	'198309052014082002',	'IVON TRISTI',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.623539',	'2021-10-07 16:13:40.623539'),
(636,	'198504272016042001',	'SUKMAWATI',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.756979',	'2021-10-07 16:13:40.756979'),
(647,	'199107132012062001',	'NITA ARMELIA, S.STP',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.858411',	'2021-10-07 16:13:40.858411'),
(494,	'196410201993101001',	'E L F I S',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.422958',	'2021-10-07 16:13:39.422958'),
(505,	'196310291984021001',	'ZAENUDDIN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.527622',	'2021-10-07 16:13:39.527622'),
(515,	'196603261988122002',	'HADIDJAH, S.SOS',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.599944',	'2021-10-07 16:13:39.599944'),
(523,	'196808122005022004',	'H E R D A, S.Sos',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.697211',	'2021-10-07 16:13:39.697211'),
(533,	'197005011998031010',	'CHAIRIL',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.776314',	'2021-10-07 16:13:39.776314'),
(543,	'197204012014082001',	'SALMA',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.904604',	'2021-10-07 16:13:39.904604'),
(551,	'197306282016042001',	'YUNITA DASMAR',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.048841',	'2021-10-07 16:13:40.048841'),
(561,	'197503052008011015',	'R I S W A N',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.111842',	'2021-10-07 16:13:40.111842'),
(569,	'197603182007011010',	'ZULHISMAN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.170378',	'2021-10-07 16:13:40.170378'),
(579,	'197706052007011029',	'ABD.SAMAD H.SAMPOW',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.252583',	'2021-10-07 16:13:40.252583'),
(588,	'197901142008011008',	'RUSNADI MANG',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.324713',	'2021-10-07 16:13:40.324713'),
(597,	'198003072006042022',	'MARINI PUJIASTUTI,S.PT',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.379655',	'2021-10-07 16:13:40.379655'),
(606,	'198109262009011006',	'E  B  I  T',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.431923',	'2021-10-07 16:13:40.431923'),
(615,	'198303102011012004',	'NUR INGKAI TEKKA, ST',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.581632',	'2021-10-07 16:13:40.581632'),
(625,	'198404042016042001',	'SARINI',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.664706',	'2021-10-07 16:13:40.664706'),
(634,	'198502032010012003',	'LASTRI SURYA WIJAYA',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.744065',	'2021-10-07 16:13:40.744065'),
(644,	'198612052016041001',	'MAB'' UD',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.820149',	'2021-10-07 16:13:40.820149'),
(495,	'196411081992102001',	'SUHATUN MUNARSO',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.425368',	'2021-10-07 16:13:39.425368'),
(506,	'196312311997031019',	'ARTUR LILING  PONGBULAAN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.528288',	'2021-10-07 16:13:39.528288'),
(516,	'196604101988031023',	'A S G A R, S.SOS',	'KASUBAG',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.601445',	'2021-10-07 16:13:39.601445'),
(524,	'196809292007012025',	'ADHLIA, S.Sos',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.700541',	'2021-10-07 16:13:39.700541'),
(534,	'197006072007012019',	'SUMIATI',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.778041',	'2021-10-07 16:13:39.778041'),
(544,	'197209052006041017',	'SAPRIN  SATANG, SE',	'KASUBAG',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.907416',	'2021-10-07 16:13:39.907416'),
(552,	'197402022008011009',	'S Y A H R I L',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.051402',	'2021-10-07 16:13:40.051402'),
(562,	'197506112007011021',	'M A N S U R, S.Sos',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.11355',	'2021-10-07 16:13:40.11355'),
(570,	'197606092009011005',	'I  W  A  N',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.171583',	'2021-10-07 16:13:40.171583'),
(580,	'197708212008011007',	'MAS''UDIN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.254688',	'2021-10-07 16:13:40.254688'),
(589,	'197902012011011003',	'FARID AMIRULLAH, S.Sos',	'KASUBAG',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.325658',	'2021-10-07 16:13:40.325658'),
(598,	'198003302008012006',	'SUSIANTI, SE',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.380752',	'2021-10-07 16:13:40.380752'),
(607,	'198110082008042002',	'ANDRIANA AHMAD, SE',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.433062',	'2021-10-07 16:13:40.433062'),
(616,	'198303202008011007',	'F A D L I',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.582946',	'2021-10-07 16:13:40.582946'),
(626,	'198404102016042001',	'HASMAWATI',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.666741',	'2021-10-07 16:13:40.666741'),
(635,	'198502062012121002',	'WAHYUDIN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.746012',	'2021-10-07 16:13:40.746012'),
(645,	'198612202014082002',	'SALBIA',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.821446',	'2021-10-07 16:13:40.821446'),
(496,	'196501011990112002',	'NURFAIDAH',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.428694',	'2021-10-07 16:13:39.428694'),
(507,	'196401011988032024',	'YENNI HAKU',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.549253',	'2021-10-07 16:13:39.549253'),
(517,	'196608102007012033',	'AGUSTIEN SUMAMPOW',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.644281',	'2021-10-07 16:13:39.644281'),
(527,	'196901232014081001',	'MASDAR',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.72966',	'2021-10-07 16:13:39.72966'),
(535,	'197007062009011004',	'MUHAMMAD ASDAR',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.833554',	'2021-10-07 16:13:39.833554'),
(545,	'197209092000031006',	'HARTOYO TEGELA',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.961687',	'2021-10-07 16:13:39.961687'),
(553,	'197406161998032010',	'SITTI  NURYANI',	'KASUBAG',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.078515',	'2021-10-07 16:13:40.078515'),
(563,	'197509162007012014',	'FITRI NGASIFAH',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.135999',	'2021-10-07 16:13:40.135999'),
(572,	'197609022001122004',	'MONARSIH, ST, M.Si',	'KASUBAG',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.197396',	'2021-10-07 16:13:40.197396'),
(581,	'197801282014082001',	'SRI WANINGSIH PAPUTUNGAN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.289261',	'2021-10-07 16:13:40.289261'),
(591,	'197904172014072001',	'YUNITA NURHISANY',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.346961',	'2021-10-07 16:13:40.346961'),
(599,	'198008142010011005',	'ALTARIANG PONANGGE, S.SI',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.404501',	'2021-10-07 16:13:40.404501'),
(609,	'198110252016041001',	'SOFYAN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.506169',	'2021-10-07 16:13:40.506169'),
(618,	'198304242016041001',	'MUNAWIR',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.614711',	'2021-10-07 16:13:40.614711'),
(627,	'198405242014081002',	'MOHAMMAD IHSAN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.696499',	'2021-10-07 16:13:40.696499'),
(637,	'198506032016041002',	'KEVIN RACHMAD JAYA',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.777892',	'2021-10-07 16:13:40.777892'),
(646,	'199001122014061001',	'MOH. NASRUN TANJUMBULU, S.STP',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.854462',	'2021-10-07 16:13:40.854462'),
(497,	'196312151986031022',	'MUSLIMIN DASTAR, S.SOS.',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.431155',	'2021-10-07 16:13:39.431155'),
(502,	'196505111992031011',	'MUJIONO',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.518394',	'2021-10-07 16:13:39.518394'),
(512,	'196601011986032022',	'DRA. ROSMI.',	'KABAG',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.594538',	'2021-10-07 16:13:39.594538'),
(520,	'196710121992032004',	'IRMA TASMAN LAKUANA.',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.692068',	'2021-10-07 16:13:39.692068'),
(530,	'196910052009011002',	'R U S T A M',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.769811',	'2021-10-07 16:13:39.769811'),
(540,	'197201072014082001',	'SALMA',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.897129',	'2021-10-07 16:13:39.897129'),
(548,	'197212222010011005',	'MADYA BUDIAWAN , SE',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.034225',	'2021-10-07 16:13:40.034225'),
(558,	'197411192008012008',	'SUSANTI, SE.',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.108188',	'2021-10-07 16:13:40.108188'),
(566,	'197511202009031001',	'JOAN PATANGARAN, ST',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.166632',	'2021-10-07 16:13:40.166632'),
(576,	'197705111996061001',	'ANDI ARMAN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.247671',	'2021-10-07 16:13:40.247671'),
(585,	'197810262008041001',	'HERMAN, A.Md',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.321427',	'2021-10-07 16:13:40.321427'),
(594,	'198001032009022003',	'H A S N A',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.376404',	'2021-10-07 16:13:40.376404'),
(603,	'198105272008012007',	'ANDISITA, SE,MM',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.428458',	'2021-10-07 16:13:40.428458'),
(612,	'198210242016042001',	'NUR FANI',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.576359',	'2021-10-07 16:13:40.576359'),
(622,	'198402092014081002',	'ROYNALDO AGIAN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.660659',	'2021-10-07 16:13:40.660659'),
(631,	'198410142016042001',	'ENDANG',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.738924',	'2021-10-07 16:13:40.738924'),
(641,	'198606252016042001',	'ANGGRIANA',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.815481',	'2021-10-07 16:13:40.815481'),
(651,	'199512152017081001',	'EKAPRASETYO MUKTI PUTRA, S.STP',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.907732',	'2021-10-07 16:13:40.907732'),
(498,	'196310211986031012',	'M U C H L I S, SH',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.436146',	'2021-10-07 16:13:39.436146'),
(501,	'196502032001122002',	'ASNI D.LAKUANA, S.SOS.',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.515828',	'2021-10-07 16:13:39.515828'),
(511,	'196510131992031006',	'MUHAMMAD RADI',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.594305',	'2021-10-07 16:13:39.594305'),
(519,	'196705222014082001',	'MEITY LEONG',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.690461',	'2021-10-07 16:13:39.690461'),
(529,	'196907072007011031',	'DARWIS,S.Sos',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.767806',	'2021-10-07 16:13:39.767806'),
(539,	'197105021996032003',	'N I R M A L A',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.891673',	'2021-10-07 16:13:39.891673'),
(547,	'197212072016041001',	'ERWIN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.032432',	'2021-10-07 16:13:40.032432'),
(557,	'197410102007011031',	'NURSAFA, S.Si',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.106654',	'2021-10-07 16:13:40.106654'),
(565,	'197509272000121003',	'DJULHARIANTO MANG, S.Sos',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.165135',	'2021-10-07 16:13:40.165135'),
(575,	'197701102008011015',	'I R W A N',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.245264',	'2021-10-07 16:13:40.245264'),
(584,	'197806172009032001',	'YUNITA PONULELLE, SE',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.320217',	'2021-10-07 16:13:40.320217'),
(593,	'197911102008011014',	'APRIYANTO MOIDADY',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.374583',	'2021-10-07 16:13:40.374583'),
(602,	'198105092014081001',	'HENDRO B.M.DIAH',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.426727',	'2021-10-07 16:13:40.426727'),
(611,	'198208092014081002',	'ANTON TOUMA',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.574486',	'2021-10-07 16:13:40.574486'),
(621,	'198401012007011004',	'D A F I D',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.658608',	'2021-10-07 16:13:40.658608'),
(630,	'198409052010012003',	'LUBNA LUVIANA',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.737283',	'2021-10-07 16:13:40.737283'),
(640,	'198604052016041001',	'RIZKY SAMA''A',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.814055',	'2021-10-07 16:13:40.814055'),
(650,	'199511042017081004',	'MUH. ICHWAN FAJAR, S.STP',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.906173',	'2021-10-07 16:13:40.906173'),
(499,	'196401021990032005',	'RUPIATI',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.434123',	'2021-10-07 16:13:39.434123'),
(509,	'196312251986031018',	'D A N I E L',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.530116',	'2021-10-07 16:13:39.530116'),
(526,	'196705142016041001',	'ALIMUDIN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.688988',	'2021-10-07 16:13:39.688988'),
(537,	'197103202009041001',	'I S M A N,  SE',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:39.889297',	'2021-10-07 16:13:39.889297'),
(555,	'197403062016041001',	'BURHAN M.Z',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.057812',	'2021-10-07 16:13:40.057812'),
(571,	'197608162007011020',	'AGUS ISMAIL',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.176958',	'2021-10-07 16:13:40.176958'),
(583,	'197712312009011017',	'MUZAKIR, S.Sos',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.261186',	'2021-10-07 16:13:40.261186'),
(600,	'198005022016041001',	'ERFIN',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.385953',	'2021-10-07 16:13:40.385953'),
(617,	'198304052010011032',	'UMAR,S.KOM',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.590491',	'2021-10-07 16:13:40.590491'),
(628,	'198405132016041001',	'MUNAWIR',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.674992',	'2021-10-07 16:13:40.674992'),
(638,	'198512192014082002',	'NURHAMSIA',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.782512',	'2021-10-07 16:13:40.782512'),
(649,	'199301122016092002',	'RESKY KHARSUCILAWATI,SSTP',	'STAF',	'BIRO UMUM SETDA PROV.SULTENG',	'-',	NULL,	'2021-10-07 16:13:40.9047',	'2021-10-07 16:13:40.9047')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "pengguna" CASCADE`);
  }
}
